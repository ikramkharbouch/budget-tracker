const { z } = require('zod');
const { commonSchemas } = require('../utils/zodHelpers');

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(false),
  fields: z.array(z.object({
    id: z.string(),
    type: z.enum(['text', 'email', 'number', 'select', 'multiselect', 'boolean', 'date']),
    label: z.string(),
    placeholder: z.string().optional(),
    required: z.boolean().default(false),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
      options: z.array(z.string()).optional()
    }).optional()
  }))
});

const onboardingDataSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: commonSchemas.email,
    phone: commonSchemas.phoneNumber.optional(),
    dateOfBirth: z.string().optional()
  }).optional(),
  
  preferences: z.object({
    language: z.string().optional(),
    timezone: z.string().optional(),
    notifications: z.object({
      email: z.boolean().default(true),
      sms: z.boolean().default(false),
      push: z.boolean().default(true)
    }).optional()
  }).optional(),
  
  customFields: z.record(z.string(), z.any()).optional()
});

const onboardingValidators = {
  startOnboarding: {
    body: z.object({
      userId: z.string().optional(),
      userType: z.enum(['individual', 'business']).default('individual'),
      referralCode: z.string().optional(),
      initialData: onboardingDataSchema.optional(),
      metadata: z.record(z.string(), z.any()).optional()
    })
  },

  getCategories: {
    query: z.object({
      userType: z.enum(['individual', 'business']).optional(),
      includeOptional: z.string().transform(val => val === 'true').optional()
    })
  },

  getProgress: {
    params: z.object({
      sessionId: commonSchemas.sessionId
    }),
    query: z.object({
      includeMetadata: z.string().transform(val => val === 'true').optional()
    })
  },

  saveProgress: {
    params: z.object({
      sessionId: commonSchemas.sessionId
    }),
    body: z.object({
      currentStep: z.number().min(0, 'Current step must be non-negative'),
      completedSteps: z.array(z.number()).default([]),
      data: onboardingDataSchema,
      metadata: z.record(z.string(), z.any()).optional(),
      lastUpdated: z.string().datetime().optional()
    })
  },

  completeOnboarding: {
    params: z.object({
      sessionId: commonSchemas.sessionId
    }),
    body: z.object({
      finalData: z.record(z.string(), z.any()).optional(),
      completionNote: z.string().optional(),
      agreedToTerms: z.boolean().default(false),
      marketingConsent: z.boolean().default(false)
    })
  },

  resetOnboarding: {
    params: z.object({
      sessionId: commonSchemas.sessionId
    }),
    query: z.object({
      reason: z.string().optional(),
      preserveUserData: z.string().transform(val => val === 'true').optional()
    })
  }
};

const responseSchemas = {
  startOnboardingResponse: z.object({
    success: z.boolean(),
    data: z.object({
      sessionId: commonSchemas.sessionId,
      expiresAt: z.string().datetime(),
      currentStep: z.number().default(0),
      totalSteps: z.number(),
      categories: z.array(categorySchema)
    })
  }),

  categoriesResponse: z.object({
    success: z.boolean(),
    data: z.array(categorySchema)
  }),

  progressResponse: z.object({
    success: z.boolean(),
    data: z.object({
      sessionId: commonSchemas.sessionId,
      currentStep: z.number(),
      completedSteps: z.array(z.number()),
      totalSteps: z.number(),
      data: onboardingDataSchema,
      status: z.enum(['active', 'completed', 'expired']),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      expiresAt: z.string().datetime()
    })
  }),

  completeOnboardingResponse: z.object({
    success: z.boolean(),
    data: z.object({
      sessionId: commonSchemas.sessionId,
      completedAt: z.string().datetime(),
      finalData: z.record(z.string(), z.any()),
      userId: z.string().optional()
    })
  })
};

module.exports = {
  onboardingValidators,
  responseSchemas,
  categorySchema,
  onboardingDataSchema
};
