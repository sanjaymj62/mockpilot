# MockPilot

A Next.js 13+ TypeScript MVP that converts OpenAPI/Swagger YAML specifications into HTTP request files with realistic mock data generated using Faker.

## Features

- 🚀 **Split-screen interface** - YAML editor on the left, generated HTTP requests on the right
- 📝 **File upload or paste** - Upload YAML files or paste directly into the editor
- 🎲 **Faker integration** - Generates realistic mock data for all schema types
- 🎨 **Syntax highlighting** - Beautiful HTTP syntax highlighting in the output panel
- 💾 **Download & Copy** - Export generated `.http` files or copy to clipboard
- 🔍 **Smart parsing** - Respects schema types, formats, examples, and constraints

## Tech Stack

- **Next.js 13+** with TypeScript
- **React 19** with TypeScript types
- **TailwindCSS** for styling
- **js-yaml** for YAML parsing
- **@faker-js/faker** for mock data generation
- **react-syntax-highlighter** for HTTP syntax highlighting

## Project Structure

```
mockpilot/
├── app/
│   ├── page.tsx              # Main split-screen UI component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── pages/
│   └── api/
│       └── generate.ts       # Backend API route for HTTP generation
├── utils/
│   └── generateFakerData.ts  # Faker data generation logic
├── types/
│   └── schema.ts             # TypeScript interfaces for OpenAPI schemas
└── package.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Upload or paste** your OpenAPI/Swagger YAML specification into the left panel
2. Click **"Generate HTTP Requests"** button
3. View the generated HTTP requests with mock data in the right panel
4. **Copy to clipboard** or **download** the `.http` file

### Example YAML

```yaml
openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
servers:
  - url: https://api.example.com
paths:
  /users:
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: User created
components:
  schemas:
    User:
      type: object
      properties:
        firstName:
          type: string
        email:
          type: string
          format: email
        age:
          type: integer
```

### Generated Output

```http
### Create a new user
POST https://api.example.com/users
Content-Type: application/json

{
  "firstName": "John",
  "email": "john.doe@example.com",
  "age": 25
}
```

## Supported Schema Features

- **Types**: string, integer, number, boolean, object, array
- **Formats**: email, uri, uuid, date, date-time, ipv4, ipv6, hostname, password
- **Constraints**: minLength, maxLength, minimum, maximum, pattern, enum
- **References**: `$ref` to components/schemas
- **Composition**: allOf, oneOf, anyOf
- **Examples**: Respects `example` and `default` values in schemas

## API Route

### `POST /api/generate`

**Request:**
```json
{
  "yaml": "openapi: 3.0.0\n..."
}
```

**Response:**
```json
{
  "httpFile": "### Create User\nPOST https://...",
  "error": null
}
```

## MVP Constraints

- No authentication required
- No database required
- Single-page interface
- Focuses on POST and PUT endpoints only
- Minimal but functional styling

## License

MIT

