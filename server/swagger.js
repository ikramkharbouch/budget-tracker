const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Onboarding API',
      version: '1.0.0',
      description: 'API documentation for the Onboarding service',
      contact: {
        name: 'API Support',
        email: 'support@yourcompany.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'ERROR_CODE'
                },
                message: {
                  type: 'string',
                  example: 'Error description'
                }
              }
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  example: 'healthy'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-01T12:00:00.000Z'
                },
                uptime: {
                  type: 'number',
                  example: 123.456
                }
              }
            }
          }
        },
        RateLimitResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'RATE_LIMIT_EXCEEDED'
                },
                message: {
                  type: 'string',
                  example: 'Too many requests from this IP, please try again later.'
                }
              }
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/ErrorResponse' },
                  {
                    properties: {
                      error: {
                        properties: {
                          code: {
                            example: 'NOT_FOUND'
                          },
                          message: {
                            example: 'Endpoint not found'
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/ErrorResponse' },
                  {
                    properties: {
                      error: {
                        properties: {
                          code: {
                            example: 'SERVER_ERROR'
                          },
                          message: {
                            example: 'Internal server error'
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        RateLimitExceeded: {
          description: 'Rate limit exceeded',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RateLimitResponse'
              }
            }
          }
        }
      }
    }
  },
  apis: [
    './server/routes/*.js', // Path to your route files
    './server.js' // Your main server file
  ]
};

// Add Swagger UI route (add this after your existing middleware but before your routes)
// (This block is removed to avoid redeclaration of swaggerSpec)

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the current health status of the API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoints
 *   - name: Onboarding
 *     description: User onboarding endpoints
 */

// Updated server file with Swagger integration
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const onboardingRoutes = require('./server/routes/onboarding');
const healthRoutes = require('./server/routes/health');

const app = express();

// Security and parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  }
});
app.use('/api/', limiter);

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Onboarding API Documentation'
}));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API routes
app.use('/api/v1/onboarding', onboardingRoutes);
app.use('/api', healthRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'Internal server error'
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Onboarding API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;