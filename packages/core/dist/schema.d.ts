export interface OpenAPISpec {
    openapi?: string;
    swagger?: string;
    info?: {
        title?: string;
        version?: string;
        description?: string;
    };
    servers?: Array<{
        url: string;
        description?: string;
    }>;
    paths: {
        [path: string]: {
            [method: string]: Operation;
        };
    };
    components?: {
        schemas?: {
            [name: string]: Schema;
        };
    };
}
export interface Operation {
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
    requestBody?: RequestBody;
    responses?: {
        [statusCode: string]: Response;
    };
}
export interface RequestBody {
    description?: string;
    required?: boolean;
    content: {
        [mediaType: string]: {
            schema: Schema | SchemaReference;
        };
    };
}
export interface Response {
    description?: string;
    content?: {
        [mediaType: string]: {
            schema: Schema | SchemaReference;
        };
    };
}
export interface Schema {
    type?: string;
    properties?: {
        [name: string]: Schema | SchemaReference;
    };
    items?: Schema | SchemaReference;
    required?: string[];
    example?: any;
    enum?: any[];
    format?: string;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    description?: string;
    default?: any;
    allOf?: Array<Schema | SchemaReference>;
    oneOf?: Array<Schema | SchemaReference>;
    anyOf?: Array<Schema | SchemaReference>;
}
export interface SchemaReference {
    $ref: string;
}
export interface Endpoint {
    method: string;
    path: string;
    summary?: string;
    description?: string;
    schema?: Schema | SchemaReference | null;
}
export interface GenerateRequest {
    yaml: string;
}
export interface GenerateResponse {
    httpFile: string;
    error?: string;
}
