const onboardingFixtures = {
  validStartRequest: {
    userId: 'user_123456'
  },
  
  validStartResponse: {
    sessionId: 'session_789abc123',
    userId: 'user_123456',
    status: 'active',
    progress: {
      currentStep: 1,
      totalSteps: 5,
      completedSteps: []
    },
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z'
  },

  validSession: {
    sessionId: 'session_789abc123',
    userId: 'user_123456',
    status: 'active',
    progress: {
      currentStep: 2,
      totalSteps: 5,
      completedSteps: ['step1']
    },
    data: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe'
      }
    },
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:05:00.000Z'
  },

  validProgressUpdate: {
    currentStep: 3,
    data: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }
  },

  validCategories: [
    {
      id: 'personal',
      name: 'Personal Information',
      description: 'Basic personal details',
      fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text', required: true },
        { name: 'email', type: 'email', required: true }
      ]
    },
    {
      id: 'preferences',
      name: 'User Preferences',
      description: 'User preferences and settings',
      fields: [
        { name: 'theme', type: 'select', options: ['light', 'dark'] },
        { name: 'notifications', type: 'boolean', default: true }
      ]
    }
  ],

  completedSession: {
    sessionId: 'session_789abc123',
    userId: 'user_123456',
    status: 'completed',
    progress: {
      currentStep: 5,
      totalSteps: 5,
      completedSteps: ['step1', 'step2', 'step3', 'step4', 'step5']
    },
    completedAt: '2024-01-01T12:10:00.000Z'
  }
};

module.exports = onboardingFixtures;

