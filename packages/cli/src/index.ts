#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import Conf from 'conf';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { generateHTTPFile } from '@mockpilot/core';

const config = new Conf({ projectName: 'mockpilot' });
const API_URL = process.env.MOCKPILOT_API_URL || 'http://localhost:3001';

const program = new Command();

program
  .name('mockpilot')
  .description('Generate HTTP request files from OpenAPI specifications')
  .version('0.1.0');

// Login command
program
  .command('login')
  .description('Authenticate with your API token')
  .argument('<token>', 'Your API token from the web app')
  .action(async (token: string) => {
    const spinner = ora('Verifying token...').start();

    try {
      // Verify token with backend
      const response = await fetch(`${API_URL}/api/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data: any = await response.json();

      // Store token
      config.set('apiToken', token);
      config.set('user', data.user);

      spinner.succeed(chalk.green(`Successfully logged in as ${data.user.email}`));
      console.log(chalk.gray('\nYou can now use the CLI to generate HTTP files.'));
    } catch (error: any) {
      spinner.fail(chalk.red('Authentication failed'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

// Logout command
program
  .command('logout')
  .description('Remove stored credentials')
  .action(() => {
    config.delete('apiToken');
    config.delete('user');
    console.log(chalk.green('✓ Logged out successfully'));
  });

// Whoami command
program
  .command('whoami')
  .description('Show current user')
  .action(() => {
    const user = config.get('user') as any;
    if (!user) {
      console.log(chalk.yellow('Not logged in. Run: mockpilot login <token>'));
      return;
    }
    console.log(chalk.green(`Logged in as: ${user.email}`));
    console.log(chalk.gray(`Plan: ${user.plan || 'Free'}`));
  });

// Generate command
program
  .command('generate')
  .description('Generate HTTP file from OpenAPI spec')
  .argument('<input>', 'Path to OpenAPI YAML file')
  .option('-o, --output <path>', 'Output file path', 'api.http')
  .action(async (input: string, options: { output: string }) => {
    // Check authentication
    const token = config.get('apiToken') as string;
    if (!token) {
      console.error(chalk.red('✗ Not authenticated. Run: mockpilot login <token>'));
      process.exit(1);
    }

    const spinner = ora('Reading OpenAPI spec...').start();

    try {
      // Read input file
      const inputPath = path.resolve(input);
      if (!fs.existsSync(inputPath)) {
        throw new Error(`File not found: ${inputPath}`);
      }

      const yamlContent = fs.readFileSync(inputPath, 'utf8');
      spinner.text = 'Parsing YAML...';

      const spec = yaml.load(yamlContent);
      spinner.text = 'Generating HTTP requests...';

      // Generate HTTP file using core library
      const httpContent = generateHTTPFile(spec as any);

      // Write output
      const outputPath = path.resolve(options.output);
      fs.writeFileSync(outputPath, httpContent, 'utf8');

      spinner.succeed(chalk.green(`✓ Generated HTTP file: ${outputPath}`));
      
      // Show stats
      const lines = httpContent.split('\n').length;
      const requests = (httpContent.match(/^(GET|POST|PUT|DELETE|PATCH)/gm) || []).length;
      
      console.log(chalk.gray(`\n  ${requests} requests, ${lines} lines`));
    } catch (error: any) {
      spinner.fail(chalk.red('Generation failed'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

// Config command
program
  .command('config')
  .description('Show configuration')
  .action(() => {
    const token = config.get('apiToken');
    const user = config.get('user') as any;

    console.log(chalk.bold('\nMockPilot Configuration:\n'));
    console.log(`Token: ${token ? chalk.green('✓ Set') : chalk.red('✗ Not set')}`);
    console.log(`User: ${user ? chalk.green(user.email) : chalk.red('Not logged in')}`);
    console.log(`Config path: ${chalk.gray(config.path)}`);
  });

program.parse();
