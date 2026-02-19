import express, { Request, Response } from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import {
  OpenAPISpec,
  GenerateResponse,
  generateHTTPFile,
} from '@mockpilot/core';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { yaml: yamlText } = req.body;

    if (!yamlText || typeof yamlText !== 'string') {
      return res.status(400).json({ httpFile: '', error: 'Invalid YAML input' });
    }

    const spec = yaml.load(yamlText) as OpenAPISpec;

    if (!spec || !spec.paths) {
      return res.status(400).json({ httpFile: '', error: 'Invalid OpenAPI/Swagger specification' });
    }

    const httpFile = generateHTTPFile(spec, {
      extractCommonParams: true,
      includeAllMethods: true,
    });

    return res.status(200).json({ httpFile });
  } catch (error) {
    console.error('Error generating HTTP file:', error);
    return res.status(500).json({
      httpFile: '',
      error: error instanceof Error ? error.message : 'Failed to generate HTTP file',
    });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
