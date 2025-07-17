const { z } = require('zod');

/**
 * Validation middleware factory
 * @param {Object} schemas - Object containing validation schemas
 * @param {z.ZodSchema} schemas.body - Body validation schema
 * @param {z.ZodSchema} schemas.params - Params validation schema
 * @param {z.ZodSchema} schemas.query - Query validation schema
 */

const validate = (schemas) => {
  return (req, res, next) => {
    try {
      const validationResults = {};
      
      // Validate request body
      if (schemas.body) {
        validationResults.body = schemas.body.parse(req.body);
        req.body = validationResults.body;
      }
      
      // Validate path parameters
      if (schemas.params) {
        validationResults.params = schemas.params.parse(req.params);
        req.params = validationResults.params;
      }
      
      // Validate query parameters
      if (schemas.query) {
        validationResults.query = schemas.query.parse(req.query);
        req.query = validationResults.query;
      }
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
              code: err.code
            }))
          }
        });
      }
      
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred during validation'
        }
      });
    }
  };
};

module.exports = { validate };