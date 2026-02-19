import { OpenAPISpec, Operation, Schema, SchemaReference } from './schema';
import { generateFakerData } from './generateFakerData';

export interface HTTPGeneratorOptions {
  extractCommonParams?: boolean;
  includeAllMethods?: boolean;
}

interface ExtractedVariable {
  name: string;
  value: string;
  usageCount: number;
}

export function generateHTTPFile(
  spec: OpenAPISpec,
  options: HTTPGeneratorOptions = {}
): string {
  const {
    extractCommonParams = true,
    includeAllMethods = true,
  } = options;

  const baseUrl = spec.servers?.[0]?.url || 'https://api.example.com';
  const requests: RequestInfo[] = [];
  const pathVariables = new Map<string, ExtractedVariable>();

  // Extract all requests
  for (const [path, pathItem] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      const methodUpper = method.toUpperCase();
      
      // Skip non-HTTP methods or filter based on options
      if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].includes(methodUpper)) {
        continue;
      }
      
      if (!includeAllMethods && !['POST', 'PUT', 'PATCH'].includes(methodUpper)) {
        continue;
      }

      requests.push({
        method: methodUpper,
        path,
        operation,
        pathParams: extractPathParams(path),
        queryParams: extractQueryParams(operation),
      });
    }
  }

  // Extract common path parameters if enabled
  if (extractCommonParams) {
    requests.forEach(req => {
      req.pathParams.forEach(param => {
        const existing = pathVariables.get(param);
        if (existing) {
          existing.usageCount++;
        } else {
          pathVariables.set(param, {
            name: param,
            value: generateParamValue(param),
            usageCount: 1,
          });
        }
      });
    });
  }

  // Generate HTTP file
  let output = '';

  // Global variables section
  output += '### Variables\n';
  output += `@baseUrl = ${baseUrl}\n`;

  // Add common path variables (used more than once)
  const commonVars = Array.from(pathVariables.values())
    .filter(v => extractCommonParams ? v.usageCount > 1 : true)
    .sort((a, b) => b.usageCount - a.usageCount);

  commonVars.forEach(variable => {
    output += `@${variable.name} = ${variable.value}\n`;
  });

  output += '\n';

  // Generate each request
  requests.forEach((req, index) => {
    output += generateRequest(req, spec, pathVariables, extractCommonParams);
    if (index < requests.length - 1) {
      output += '\n';
    }
  });

  return output;
}

interface RequestInfo {
  method: string;
  path: string;
  operation: Operation;
  pathParams: string[];
  queryParams: Map<string, any>;
}

function extractPathParams(path: string): string[] {
  const matches = path.matchAll(/\{(\w+)\}/g);
  return Array.from(matches, m => m[1]);
}

function extractQueryParams(operation: Operation): Map<string, any> {
  const params = new Map<string, any>();
  
  // OpenAPI 3.0 parameters
  if ((operation as any).parameters) {
    (operation as any).parameters.forEach((param: any) => {
      if (param.in === 'query') {
        params.set(param.name, param.example || param.schema?.example || generateParamValue(param.name));
      }
    });
  }

  return params;
}

function generateParamValue(paramName: string): string {
  const lowerName = paramName.toLowerCase();
  
  // Common parameter name patterns
  if (lowerName.includes('id') || lowerName === 'personid' || lowerName === 'userid') {
    return '123';
  }
  if (lowerName.includes('name')) {
    return 'example-name';
  }
  if (lowerName.includes('email')) {
    return 'user@example.com';
  }
  if (lowerName.includes('page')) {
    return '1';
  }
  if (lowerName.includes('limit') || lowerName.includes('size')) {
    return '10';
  }
  if (lowerName.includes('offset')) {
    return '0';
  }
  if (lowerName.includes('sort')) {
    return 'created';
  }
  if (lowerName.includes('order')) {
    return 'desc';
  }
  
  return 'example-value';
}

function generateRequest(
  req: RequestInfo,
  spec: OpenAPISpec,
  globalVars: Map<string, ExtractedVariable>,
  useGlobalVars: boolean
): string {
  let output = '';
  
  // Request name/comment
  const requestName = req.operation.summary || 
                      req.operation.description || 
                      `${req.method} ${req.path}`;
  output += `### ${requestName}\n`;

  // Local variables (path params not in global scope or single-use)
  const localPathParams = req.pathParams.filter(param => {
    const globalVar = globalVars.get(param);
    return !useGlobalVars || !globalVar || globalVar.usageCount === 1;
  });

  localPathParams.forEach(param => {
    output += `@${param} = ${generateParamValue(param)}\n`;
  });

  // Build URL with template variables
  let url = '{{baseUrl}}';
  let pathWithVars = req.path.replace(/\{(\w+)\}/g, '{{$1}}');
  url += pathWithVars;

  // Add query parameters
  if (req.queryParams.size > 0) {
    const queryParts: string[] = [];
    req.queryParams.forEach((value, key) => {
      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    });
    url += '?' + queryParts.join('&');
  }

  output += `${req.method} ${url}\n`;

  // Headers
  const headers = extractHeaders(req.operation);
  headers.forEach(([key, value]) => {
    output += `${key}: ${value}\n`;
  });

  // Request body for POST/PUT/PATCH
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const schema = extractRequestBodySchema(req.operation);
    if (schema) {
      if (!headers.some(([key]) => key.toLowerCase() === 'content-type')) {
        output += `Content-Type: application/json\n`;
      }
      const payload = generateFakerData(schema, spec);
      output += `\n${JSON.stringify(payload, null, 2)}`;
    }
  }

  output += '\n';
  return output;
}

function extractHeaders(operation: Operation): Array<[string, string]> {
  const headers: Array<[string, string]> = [];
  
  // Check for security schemes (e.g., Bearer token)
  if ((operation as any).security) {
    // Simplified - add Authorization header if security is defined
    headers.push(['Authorization', 'Bearer {{authToken}}']);
  }
  
  // Extract header parameters
  if ((operation as any).parameters) {
    (operation as any).parameters.forEach((param: any) => {
      if (param.in === 'header') {
        const value = param.example || param.schema?.example || 'example-value';
        headers.push([param.name, value]);
      }
    });
  }

  return headers;
}

function extractRequestBodySchema(operation: Operation): Schema | SchemaReference | null {
  const requestBody = operation.requestBody;
  if (!requestBody?.content) {
    return null;
  }

  const jsonContent = requestBody.content['application/json'];
  if (jsonContent?.schema) {
    return jsonContent.schema;
  }

  return null;
}
