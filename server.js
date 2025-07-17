const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

const onboardingRoutes = require('./server/routes/onboarding');
const healthRoutes = require('./server/routes/health');
const { applySecurityMiddleware } = require('./server/middleware/security');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

applySecurityMiddleware(app);

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Onboarding API',
      version: '1.0.0',
      description: 'API documentation for the Onboarding service with session-based user onboarding flow',
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
        StartOnboardingRequest: {
          type: 'object',
          required: ['userId', 'email'],
          properties: {
            userId: {
              type: 'string',
              description: 'Unique identifier for the user',
              example: 'user_123456'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            metadata: {
              type: 'object',
              description: 'Additional user metadata',
              example: {
                source: 'web',
                referrer: 'google'
              }
            }
          }
        },
        StartOnboardingResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                sessionId: {
                  type: 'string',
                  description: 'Unique session identifier for the onboarding process',
                  example: 'session_789abc123'
                },
                userId: {
                  type: 'string',
                  example: 'user_123456'
                },
                status: {
                  type: 'string',
                  enum: ['started', 'in_progress', 'completed'],
                  example: 'started'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-01T12:00:00.000Z'
                },
                expiresAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-02T12:00:00.000Z'
                }
              }
            }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'cat_001'
            },
            name: {
              type: 'string',
              example: 'Personal Information'
            },
            description: {
              type: 'string',
              example: 'Basic personal details and preferences'
            },
            order: {
              type: 'integer',
              example: 1
            },
            required: {
              type: 'boolean',
              example: true
            },
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'field_001'
                  },
                  name: {
                    type: 'string',
                    example: 'firstName'
                  },
                  type: {
                    type: 'string',
                    enum: ['text', 'email', 'number', 'select', 'multiselect', 'boolean'],
                    example: 'text'
                  },
                  label: {
                    type: 'string',
                    example: 'First Name'
                  },
                  required: {
                    type: 'boolean',
                    example: true
                  },
                  options: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    example: ['Option 1', 'Option 2']
                  }
                }
              }
            }
          }
        },
        OnboardingProgress: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                sessionId: {
                  type: 'string',
                  example: 'session_789abc123'
                },
                userId: {
                  type: 'string',
                  example: 'user_123456'
                },
                status: {
                  type: 'string',
                  enum: ['started', 'in_progress', 'completed'],
                  example: 'in_progress'
                },
                currentStep: {
                  type: 'integer',
                  example: 2
                },
                totalSteps: {
                  type: 'integer',
                  example: 5
                },
                completedCategories: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: ['cat_001', 'cat_002']
                },
                progress: {
                  type: 'object',
                  description: 'Current progress data',
                  example: {
                    personalInfo: {
                      firstName: 'John',
                      lastName: 'Doe',
                      email: 'john@example.com'
                    },
                    preferences: {
                      notifications: true,
                      theme: 'dark'
                    }
                  }
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-01T12:30:00.000Z'
                }
              }
            }
          }
        },
        SaveProgressRequest: {
          type: 'object',
          properties: {
            categoryId: {
              type: 'string',
              description: 'Category being updated',
              example: 'cat_001'
            },
            data: {
              type: 'object',
              description: 'Progress data to save',
              example: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com'
              }
            },
            currentStep: {
              type: 'integer',
              description: 'Current step number',
              example: 2
            }
          }
        },
        CompleteOnboardingResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                sessionId: {
                  type: 'string',
                  example: 'session_789abc123'
                },
                userId: {
                  type: 'string',
                  example: 'user_123456'
                },
                status: {
                  type: 'string',
                  example: 'completed'
                },
                completedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-01T13:00:00.000Z'
                },
                finalData: {
                  type: 'object',
                  description: 'Complete onboarding data',
                  example: {
                    personalInfo: {
                      firstName: 'John',
                      lastName: 'Doe',
                      email: 'john@example.com'
                    },
                    preferences: {
                      notifications: true,
                      theme: 'dark'
                    }
                  }
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
        ValidationError: {
          description: 'Validation error',
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
                            example: 'VALIDATION_ERROR'
                          },
                          message: {
                            example: 'Invalid request data'
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
        SessionNotFound: {
          description: 'Onboarding session not found',
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
                            example: 'SESSION_NOT_FOUND'
                          },
                          message: {
                            example: 'Onboarding session not found'
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
    './server/routes/*.js',
    './server.js'
  ]
};

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