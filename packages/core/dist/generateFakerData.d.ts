import { Schema, SchemaReference, OpenAPISpec } from './schema';
export declare function isSchemaReference(obj: any): obj is SchemaReference;
export declare function resolveSchemaReference(ref: string, spec: OpenAPISpec): Schema | null;
export declare function generateFakerData(schema: Schema | SchemaReference, spec: OpenAPISpec, visited?: Set<string>): any;
