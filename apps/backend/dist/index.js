"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const core_1 = require("@mockpilot/core");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.post('/api/generate', async (req, res) => {
    try {
        const { yaml: yamlText } = req.body;
        if (!yamlText || typeof yamlText !== 'string') {
            return res.status(400).json({ httpFile: '', error: 'Invalid YAML input' });
        }
        const spec = js_yaml_1.default.load(yamlText);
        if (!spec || !spec.paths) {
            return res.status(400).json({ httpFile: '', error: 'Invalid OpenAPI/Swagger specification' });
        }
        const httpFile = (0, core_1.generateHTTPFile)(spec, {
            extractCommonParams: true,
            includeAllMethods: true,
        });
        return res.status(200).json({ httpFile });
    }
    catch (error) {
        console.error('Error generating HTTP file:', error);
        return res.status(500).json({
            httpFile: '',
            error: error instanceof Error ? error.message : 'Failed to generate HTTP file',
        });
    }
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
