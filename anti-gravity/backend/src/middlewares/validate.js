const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = (schema) => {
    const compile = ajv.compile(schema);
    return (req, res, next) => {
        const valid = compile(req.body);
        if (!valid) {
            const errors = compile.errors.map((err) => ({
                field: err.instancePath.replace('/', ''),
                message: err.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors
            });
        }
        next();
    };
};

module.exports = validate;
