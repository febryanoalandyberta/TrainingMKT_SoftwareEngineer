const loginSchema = {
    type: 'object',
    required: ['token'],
    properties: {
        token: {
            type: 'string',
            minLength: 10
        }
    }
};

module.exports = { loginSchema };
