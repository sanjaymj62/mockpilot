import type { NextApiRequest, NextApiResponse } from 'next';
import yaml from 'js-yaml';
import { OpenAPISpec, Endpoint, GenerateResponse } from '@/types/schema';
import { generateFakerData } from '@/utils/generateFakerData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ httpFile: '', error: 'Method not allowed' });
  }

  try {
    const { yaml: yamlText } = req.body;

    if (!yamlText || typeof yamlText !== 'string') {
      return res.status(400).json({ httpFile: '', error: 'Invalid YAML input' });
    }

    const spec = yaml.load(yamlText) as OpenAPISpec;

    if (!spec || !spec.paths) {
      return res.status(400).json({ httpFile: '', error: 'Invalid OpenAPI/Swagger specification' });
    }

    const baseUrl = spec.servers?.[0]?.url || 'https://api.example.com';
    const endpoints: Endpoint[] = [];

    for (const [path, pathItem] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        const methodUpper = method.toUpperCase();
        
        if (methodUpper === 'POST' || methodUpper === 'PUT') {
          const requestBody = operation.requestBody;
          let schema = null;

          if (requestBody?.content) {
            const jsonContent = requestBody.content['application/json'];
            if (jsonContent?.schema) {
              schema = jsonContent.schema;
            }
          }

          endpoints.push({
            method: methodUpper,
            path,
            summary: operation.summary,
            description: operation.description,
            schema,
          });
        }
      }
    }

    const httpRequests: string[] = [];

    for (const endpoint of endpoints) {
      const comment = endpoint.summary || endpoint.description || `${endpoint.method} ${endpoint.path}`;
      let httpRequest = `### ${comment}\n`;
      httpRequest += `${endpoint.method} ${baseUrl}${endpoint.path}\n`;
      httpRequest += `Content-Type: application/json\n`;

      if (endpoint.schema) {
        const payload = generateFakerData(endpoint.schema, spec);
        httpRequest += `\n${JSON.stringify(payload, null, 2)}`;
      }

      httpRequests.push(httpRequest);
    }

    const httpFile = httpRequests.join('\n\n');

    return res.status(200).json({ httpFile });
  } catch (error) {
    console.error('Error generating HTTP file:', error);
    return res.status(500).json({
      httpFile: '',
      error: error instanceof Error ? error.message : 'Failed to generate HTTP file',
    });
  }
}
