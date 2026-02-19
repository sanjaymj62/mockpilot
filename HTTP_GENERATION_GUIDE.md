# HTTP File Generation with Template Literal Style

MockPilot generates `.http` files from OpenAPI/Swagger specifications using a **Template Literal Style** approach for handling base URLs, path variables, and query parameters.

## How It Works

### Variables Section

All HTTP files start with a variables section that includes:

1. **Base URL** - The API server URL
2. **Common Path Parameters** - Path variables used across multiple requests

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123
@userId = 456
```

### Request Format

Each request uses template variables in the `{{variableName}}` format:

```http
### Get Person by ID
GET {{baseUrl}}/persons/{{personId}}?include=profile&limit=10

### Update Person
PUT {{baseUrl}}/persons/{{personId}}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com"
}
```

## Variable Reuse Strategy

### Global Variables

Variables used in **multiple requests** are defined globally at the top:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123

### Get Person
GET {{baseUrl}}/persons/{{personId}}

### Update Person
PUT {{baseUrl}}/persons/{{personId}}
Content-Type: application/json

### Get Person Orders
GET {{baseUrl}}/persons/{{personId}}/orders
```

### Local Variables

Variables used in **single requests** are defined locally before the request:

```http
### Get Person Order
@orderId = 456
GET {{baseUrl}}/persons/{{personId}}/orders/{{orderId}}
```

## Benefits

### 1. Easy Environment Switching

Simply change the base URL to switch between environments:

```http
### Variables
# @baseUrl = https://api.example.com          # Production
@baseUrl = https://staging-api.example.com     # Staging
# @baseUrl = http://localhost:3000             # Local
```

### 2. Parameter Reuse

Change a parameter value once, and it applies to all requests using it:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123  # Change this to test different persons
```

### 3. Query Parameters

Query parameters are included directly in the URL with their values:

```http
GET {{baseUrl}}/persons?page=1&limit=10&sort=created
```

To make query parameters reusable, define them as variables:

```http
### Variables
@baseUrl = https://api.example.com
@page = 1
@limit = 10

### List Persons
GET {{baseUrl}}/persons?page={{page}}&limit={{limit}}
```

## Path Variable Handling

Path variables in your OpenAPI spec like `/persons/{personId}` are automatically:

1. **Extracted** from the path
2. **Converted** to template variables `{{personId}}`
3. **Assigned** default values based on naming patterns
4. **Grouped** as global variables if used multiple times

### Smart Default Values

MockPilot generates sensible defaults based on parameter names:

| Parameter Pattern | Default Value |
|------------------|---------------|
| `*Id`, `personId`, `userId` | `123` |
| `*name` | `example-name` |
| `*email` | `user@example.com` |
| `page` | `1` |
| `limit`, `size` | `10` |
| `offset` | `0` |
| `sort` | `created` |
| `order` | `desc` |

## Generator Options

You can customize the generation behavior:

```typescript
generateHTTPFile(spec, {
  extractCommonParams: true,  // Extract commonly used params as global variables
  includeAllMethods: true,    // Include GET, POST, PUT, DELETE, etc.
})
```

### Options

- **`extractCommonParams`** (default: `true`)
  - When `true`: Variables used 2+ times become global variables
  - When `false`: All variables are defined locally per request

- **`includeAllMethods`** (default: `true`)
  - When `true`: Generates requests for all HTTP methods (GET, POST, PUT, PATCH, DELETE, etc.)
  - When `false`: Only generates requests for methods with request bodies (POST, PUT, PATCH)

## Example OpenAPI → HTTP Conversion

### Input (OpenAPI YAML)

```yaml
openapi: 3.0.0
servers:
  - url: https://api.example.com

paths:
  /persons/{personId}:
    get:
      summary: Get Person
      parameters:
        - name: personId
          in: path
          required: true
        - name: include
          in: query
          schema:
            example: profile
```

### Output (HTTP File)

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123

### Get Person
GET {{baseUrl}}/persons/{{personId}}?include=profile
```

## Usage in REST Clients

The generated `.http` files work with:

- **VS Code REST Client** extension
- **IntelliJ HTTP Client**
- **JetBrains IDEs** (WebStorm, PhpStorm, etc.)

Simply click "Send Request" above each `###` comment to execute the request.

## Best Practices

1. **Keep base URL at the top** - Easy to find and modify
2. **Use meaningful variable names** - `@userId` is clearer than `@id`
3. **Comment alternate environments** - Show users how to switch
4. **Group related requests** - Use descriptive section comments
5. **Test with real IDs** - Replace default values with actual data from your system

## Advanced: Manual Customization

After generation, you can manually enhance the HTTP file:

```http
### Variables
@baseUrl = https://api.example.com
@personId = 123
@authToken = your-jwt-token-here

### Get Person
# @name getPerson
GET {{baseUrl}}/persons/{{personId}}
Authorization: Bearer {{authToken}}

### Use response from previous request
@orderId = {{getPerson.response.body.lastOrderId}}
GET {{baseUrl}}/orders/{{orderId}}
```

This approach gives you the best of both worlds: automated generation with the flexibility to customize as needed.
