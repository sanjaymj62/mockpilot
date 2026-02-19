# MockPilot Examples

This directory contains examples demonstrating the Template Literal Style HTTP file generation.

## Files

- **`example-api.yaml`** - Sample OpenAPI specification
- **`example-output.http`** - Generated HTTP file showing the Template Literal Style
- **`usage-examples.ts`** - TypeScript examples showing different generator options

## Running the Examples

### Using the CLI

```bash
# Build the CLI first
pnpm build:cli

# Generate HTTP file from YAML
node apps/cli/dist/index.js examples/example-api.yaml examples/output.http
```

### Programmatic Usage

```typescript
import { generateHTTPFile } from '@mockpilot/core';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const spec = yaml.load(fs.readFileSync('example-api.yaml', 'utf8'));

// Generate with default options
const httpFile = generateHTTPFile(spec, {
  extractCommonParams: true,  // Extract reused params as global variables
  includeAllMethods: true,    // Include all HTTP methods
});

console.log(httpFile);
```

## Key Features Demonstrated

### 1. Global Variables
Variables used across multiple requests are defined at the top:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123
```

### 2. Template Syntax
URLs use `{{variableName}}` syntax for easy replacement:

```http
GET {{baseUrl}}/persons/{{personId}}
```

### 3. Query Parameters
Query parameters are included with their values:

```http
GET {{baseUrl}}/persons/{{personId}}/orders?status=completed&limit=10
```

### 4. Request Bodies
POST/PUT/PATCH requests include mock data bodies:

```http
PUT {{baseUrl}}/persons/{{personId}}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "example@email.com"
}
```

## Generator Options

### Extract Common Params

**When `true` (default):**
Parameters used 2+ times become global variables.

**When `false`:**
All parameters are defined locally per request.

### Include All Methods

**When `true` (default):**
Generates requests for GET, POST, PUT, DELETE, etc.

**When `false`:**
Only generates POST, PUT, PATCH (methods with bodies).

## Next Steps

- See [HTTP_GENERATION_GUIDE.md](../HTTP_GENERATION_GUIDE.md) for comprehensive documentation
- Check the root README for full project setup instructions
