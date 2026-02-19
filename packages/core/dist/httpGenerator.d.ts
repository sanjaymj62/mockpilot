import { OpenAPISpec } from './schema';
export interface HTTPGeneratorOptions {
    extractCommonParams?: boolean;
    includeAllMethods?: boolean;
}
export declare function generateHTTPFile(spec: OpenAPISpec, options?: HTTPGeneratorOptions): string;
