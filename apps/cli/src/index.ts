#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';
import {
  OpenAPISpec,
  generateHTTPFile,
} from '@mockpilot/core';

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: mockpilot <openapi-file.yaml> [output-file.http]');
    console.log('Example: mockpilot swagger.yaml requests.http');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || 'requests.http';

  try {
    const yamlText = fs.readFileSync(inputFile, 'utf8');
    const spec = yaml.load(yamlText) as OpenAPISpec;

    if (!spec || !spec.paths) {
      throw new Error('Invalid OpenAPI/Swagger specification');
    }

    const httpFile = generateHTTPFile(spec, {
      extractCommonParams: true,
      includeAllMethods: true,
    });

    fs.writeFileSync(outputFile, httpFile);

    const requestCount = Object.keys(spec.paths).reduce((count, path) => {
      return count + Object.keys(spec.paths[path]).length;
    }, 0);

    console.log(`✅ Generated ${requestCount} HTTP requests`);
    console.log(`📁 Output written to: ${outputFile}`);
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
