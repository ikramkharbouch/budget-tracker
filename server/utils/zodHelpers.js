const { z } = require('zod');

// Common validation schemas
const commonSchemas = {
  sessionId: z.string().min(1, 'Session ID is required').regex(/^session_[a-zA-Z0-9]+$/, 'Invalid session ID format'),
  
  objectId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
  
  email: z.string().email('Invalid email format'),
  
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  
  dateString: z.string().datetime('Invalid date format'),
  
  nonEmptyString: z.string().min(1, 'Field cannot be empty'),
  
  positiveNumber: z.number().positive('Must be a positive number'),
  
  paginationQuery: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
  })
};

// Helper functions
const createApiResponse = (dataSchema) => {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime().optional()
  });
};

const createErrorResponse = () => {
  return z.object({
    success: z.literal(false),
    error: z.object({
      code: z.string(),
      message: z.string(),
      details: z.array(z.object({
        field: z.string(),
        message: z.string(),
        code: z.string()
      })).optional()
    })
  });
};

module.exports = {
  commonSchemas,
  createApiResponse,
  createErrorResponse
};