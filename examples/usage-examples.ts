import { generateHTTPFile } from '@mockpilot/core';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Example 1: With common parameter extraction (default)
const spec1 = yaml.load(fs.readFileSync('test-api.yaml', 'utf8'));
const http1 = generateHTTPFile(spec1, {
  extractCommonParams: true,  // personId used multiple times becomes global
  includeAllMethods: true,
});
console.log('=== WITH COMMON PARAMS ===');
console.log(http1);

// Example 2: Without common parameter extraction
const spec2 = yaml.load(fs.readFileSync('test-api.yaml', 'utf8'));
const http2 = generateHTTPFile(spec2, {
  extractCommonParams: false,  // All params are local per request
  includeAllMethods: true,
});
console.log('\n=== WITHOUT COMMON PARAMS ===');
console.log(http2);

// Example 3: Only POST/PUT/PATCH requests
const spec3 = yaml.load(fs.readFileSync('test-api.yaml', 'utf8'));
const http3 = generateHTTPFile(spec3, {
  extractCommonParams: true,
  includeAllMethods: false,  // Only methods with request bodies
});
console.log('\n=== ONLY POST/PUT/PATCH ===');
console.log(http3);
