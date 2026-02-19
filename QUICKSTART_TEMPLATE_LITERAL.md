# Quick Start: Template Literal Style HTTP Generation

Generate HTTP request files from OpenAPI/Swagger YAML with clean, reusable variables.

## What You'll Get

Transform this OpenAPI YAML:

```yaml
openapi: 3.0.0
servers:
  - url: https://api.example.com
paths:
  /persons/{personId}:
    get:
      summary: Get Person
```

Into this HTTP file:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123

### Get Person
GET {{baseUrl}}/persons/{{personId}}
```

## Using the CLI

```bash
# 1. Build the project
pnpm install
pnpm build

# 2. Generate HTTP file
node apps/cli/dist/index.js your-api.yaml output.http
```

## Using Programmatically

```typescript
import { generateHTTPFile } from '@mockpilot/core';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

// Load your OpenAPI spec
const spec = yaml.load(fs.readFileSync('api.yaml', 'utf8'));

// Generate HTTP file
const httpFile = generateHTTPFile(spec, {
  extractCommonParams: true,  // Reuse common variables
  includeAllMethods: true,    // Include all HTTP methods
});

// Save or use the result
fs.writeFileSync('requests.http', httpFile);
console.log(httpFile);
```

## Key Features

### 1. Auto-Detects Reused Variables

If `personId` is used in multiple endpoints, it becomes a global variable:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123    ← Global (used multiple times)

### Get Person
GET {{baseUrl}}/persons/{{personId}}

### Update Person
PUT {{baseUrl}}/persons/{{personId}}

### Get Person Orders
GET {{baseUrl}}/persons/{{personId}}/orders
```

### 2. Local Variables for Single Use

Parameters used once are defined locally:

```http
### Get Product
@productId = 123    ← Local (used only here)
GET {{baseUrl}}/products/{{productId}}
```

### 3. Query Parameters Included

```http
GET {{baseUrl}}/persons?page=1&limit=10&sort=name
```

### 4. Request Bodies with Mock Data

```http
POST {{baseUrl}}/persons
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com"
}
```

## Options

### Only Generate POST/PUT/PATCH

```typescript
generateHTTPFile(spec, {
  includeAllMethods: false  // Skip GET, DELETE, etc.
})
```

### Keep All Variables Local

```typescript
generateHTTPFile(spec, {
  extractCommonParams: false  // Don't create global variables
})
```

## Use in REST Clients

The generated `.http` files work with:

- **VS Code REST Client** extension
- **IntelliJ IDEA HTTP Client**
- **WebStorm**, **PhpStorm**, etc.

Just click "Send Request" above each `###` comment to execute.

## Customize After Generation

The generated file is easy to customize:

```http
### Variables
@baseUrl = https://api.staging.com    ← Change to staging
@personId = 456                        ← Test with different ID
@authToken = your-jwt-token-here       ← Add auth

### Get Person
GET {{baseUrl}}/persons/{{personId}}
Authorization: Bearer {{authToken}}    ← Add custom headers
```

## Examples

See the `examples/` folder for complete working examples:
- `example-api.yaml` - Sample OpenAPI spec
- `example-output.http` - Generated output
- `README.md` - Detailed examples

## Full Documentation

For comprehensive information, see:
- [HTTP_GENERATION_GUIDE.md](./HTTP_GENERATION_GUIDE.md) - Complete guide
- [TEMPLATE_LITERAL_IMPLEMENTATION.md](./TEMPLATE_LITERAL_IMPLEMENTATION.md) - Technical details
- [README.md](./README.md) - Project overview
