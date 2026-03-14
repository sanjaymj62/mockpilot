#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const conf_1 = __importDefault(require("conf"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const core_1 = require("@mockpilot/core");
const config = new conf_1.default({ projectName: 'mockpilot' });
const API_URL = process.env.MOCKPILOT_API_URL || 'http://localhost:3001';
const program = new commander_1.Command();
program
    .name('mockpilot')
    .description('Generate HTTP request files from OpenAPI specifications')
    .version('0.1.0');
// Login command
program
    .command('login')
    .description('Authenticate with your API token')
    .argument('<token>', 'Your API token from the web app')
    .action(async (token) => {
    const spinner = (0, ora_1.default)('Verifying token...').start();
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
        const data = await response.json();
        // Store token
        config.set('apiToken', token);
        config.set('user', data.user);
        spinner.succeed(chalk_1.default.green(`Successfully logged in as ${data.user.email}`));
        console.log(chalk_1.default.gray('\nYou can now use the CLI to generate HTTP files.'));
    }
    catch (error) {
        spinner.fail(chalk_1.default.red('Authentication failed'));
        console.error(chalk_1.default.red(error.message));
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
    console.log(chalk_1.default.green('✓ Logged out successfully'));
});
// Whoami command
program
    .command('whoami')
    .description('Show current user')
    .action(() => {
    const user = config.get('user');
    if (!user) {
        console.log(chalk_1.default.yellow('Not logged in. Run: mockpilot login <token>'));
        return;
    }
    console.log(chalk_1.default.green(`Logged in as: ${user.email}`));
    console.log(chalk_1.default.gray(`Plan: ${user.plan || 'Free'}`));
});
// Generate command
program
    .command('generate')
    .description('Generate HTTP file from OpenAPI spec')
    .argument('<input>', 'Path to OpenAPI YAML file')
    .option('-o, --output <path>', 'Output file path', 'api.http')
    .action(async (input, options) => {
    // Check authentication
    const token = config.get('apiToken');
    if (!token) {
        console.error(chalk_1.default.red('✗ Not authenticated. Run: mockpilot login <token>'));
        process.exit(1);
    }
    const spinner = (0, ora_1.default)('Reading OpenAPI spec...').start();
    try {
        // Read input file
        const inputPath = path_1.default.resolve(input);
        if (!fs_1.default.existsSync(inputPath)) {
            throw new Error(`File not found: ${inputPath}`);
        }
        const yamlContent = fs_1.default.readFileSync(inputPath, 'utf8');
        spinner.text = 'Parsing YAML...';
        const spec = js_yaml_1.default.load(yamlContent);
        spinner.text = 'Generating HTTP requests...';
        // Generate HTTP file using core library
        const httpContent = (0, core_1.generateHTTPFile)(spec);
        // Write output
        const outputPath = path_1.default.resolve(options.output);
        fs_1.default.writeFileSync(outputPath, httpContent, 'utf8');
        spinner.succeed(chalk_1.default.green(`✓ Generated HTTP file: ${outputPath}`));
        // Show stats
        const lines = httpContent.split('\n').length;
        const requests = (httpContent.match(/^(GET|POST|PUT|DELETE|PATCH)/gm) || []).length;
        console.log(chalk_1.default.gray(`\n  ${requests} requests, ${lines} lines`));
    }
    catch (error) {
        spinner.fail(chalk_1.default.red('Generation failed'));
        console.error(chalk_1.default.red(error.message));
        process.exit(1);
    }
});
// Config command
program
    .command('config')
    .description('Show configuration')
    .action(() => {
    const token = config.get('apiToken');
    const user = config.get('user');
    console.log(chalk_1.default.bold('\nMockPilot Configuration:\n'));
    console.log(`Token: ${token ? chalk_1.default.green('✓ Set') : chalk_1.default.red('✗ Not set')}`);
    console.log(`User: ${user ? chalk_1.default.green(user.email) : chalk_1.default.red('Not logged in')}`);
    console.log(`Config path: ${chalk_1.default.gray(config.path)}`);
});
program.parse();
//# sourceMappingURL=index.js.map