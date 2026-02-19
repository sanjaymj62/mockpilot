import { faker } from '@faker-js/faker';
import { Schema, SchemaReference, OpenAPISpec } from './schema';

export function isSchemaReference(obj: any): obj is SchemaReference {
  return obj && typeof obj === 'object' && '$ref' in obj;
}

export function resolveSchemaReference(
  ref: string,
  spec: OpenAPISpec
): Schema | null {
  const parts = ref.split('/');
  if (parts[0] === '#' && parts[1] === 'components' && parts[2] === 'schemas') {
    const schemaName = parts[3];
    return spec.components?.schemas?.[schemaName] || null;
  }
  return null;
}

export function generateFakerData(
  schema: Schema | SchemaReference,
  spec: OpenAPISpec,
  visited: Set<string> = new Set()
): any {
  if (isSchemaReference(schema)) {
    const ref = schema.$ref;
    if (visited.has(ref)) {
      return null;
    }
    visited.add(ref);
    const resolvedSchema = resolveSchemaReference(ref, spec);
    if (!resolvedSchema) return null;
    return generateFakerData(resolvedSchema, spec, visited);
  }

  if (schema.example !== undefined) {
    return schema.example;
  }

  if (schema.default !== undefined) {
    return schema.default;
  }

  if (schema.enum && schema.enum.length > 0) {
    return faker.helpers.arrayElement(schema.enum);
  }

  if (schema.allOf) {
    const merged: any = {};
    for (const subSchema of schema.allOf) {
      const data = generateFakerData(subSchema, spec, visited);
      if (data && typeof data === 'object') {
        Object.assign(merged, data);
      }
    }
    return merged;
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    const chosen = faker.helpers.arrayElement(schema.oneOf);
    return generateFakerData(chosen, spec, visited);
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    const chosen = faker.helpers.arrayElement(schema.anyOf);
    return generateFakerData(chosen, spec, visited);
  }

  const type = schema.type || 'string';

  switch (type.toLowerCase()) {
    case 'object':
      if (!schema.properties) return {};
      const obj: any = {};
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        obj[propName] = generateFakerData(propSchema, spec, visited);
      }
      return obj;

    case 'array':
      if (!schema.items) return [];
      const arrayLength = faker.number.int({ min: 1, max: 3 });
      return Array.from({ length: arrayLength }, () =>
        generateFakerData(schema.items!, spec, visited)
      );

    case 'string':
      return generateStringValue(schema);

    case 'integer':
    case 'number':
      return generateNumberValue(schema);

    case 'boolean':
      return faker.datatype.boolean();

    case 'null':
      return null;

    default:
      return faker.lorem.word();
  }
}

function generateStringValue(schema: Schema): string {
  const format = schema.format?.toLowerCase();

  switch (format) {
    case 'email':
      return faker.internet.email();
    case 'uri':
    case 'url':
      return faker.internet.url();
    case 'uuid':
      return faker.string.uuid();
    case 'date':
      return faker.date.recent().toISOString().split('T')[0];
    case 'date-time':
      return faker.date.recent().toISOString();
    case 'time':
      return faker.date.recent().toTimeString().split(' ')[0];
    case 'hostname':
      return faker.internet.domainName();
    case 'ipv4':
      return faker.internet.ipv4();
    case 'ipv6':
      return faker.internet.ipv6();
    case 'password':
      return faker.internet.password();
    case 'byte':
      return Buffer.from(faker.string.alphanumeric(16)).toString('base64');
    case 'binary':
      return faker.string.binary();
    default:
      if (schema.pattern) {
        try {
          return faker.helpers.fromRegExp(new RegExp(schema.pattern));
        } catch {
          return faker.lorem.word();
        }
      }
      
      const minLength = schema.minLength || 1;
      const maxLength = schema.maxLength || 50;
      const length = faker.number.int({ min: minLength, max: Math.min(maxLength, 50) });
      
      return faker.lorem.words(Math.ceil(length / 5)).substring(0, length);
  }
}

function generateNumberValue(schema: Schema): number {
  const min = schema.minimum !== undefined ? schema.minimum : 0;
  const max = schema.maximum !== undefined ? schema.maximum : 1000;
  
  if (schema.type === 'integer') {
    return faker.number.int({ min, max });
  }
  
  return faker.number.float({ min, max, fractionDigits: 2 });
}
