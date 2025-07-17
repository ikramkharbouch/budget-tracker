const { v4: uuidv4 } = require('uuid');
const { AVAILABLE_CATEGORIES, VALID_PHASES, VALID_TIMEFRAMES } = require('../config/constants');

const onboardingSessions = new Map();

class OnboardingService {
  createInitialOnboardingState(userId) {
    return {
      sessionId: uuidv4(),
      userId,
      currentPhase: 'form-details',
      selectedCategories: [],
      categoryExpenses: {
        'Groceries': '',
        'Restaurants': '',
        'Credit Card Debt': '',
        'Utilities': '',
        'Insurance': ''
      },
      primaryJobIncome: '',
      targetSavings: '',
      timeFrame: '3 months',
      reductionStrategy: '',
      completedAt: null,
      isOnboardingCompleted: false,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
  }

  async startOnboarding(userId) {
    const finalUserId = userId || uuidv4();
    
    // Check if user already has an active session
    const existingSession = Array.from(onboardingSessions.values())
      .find(session => session.userId === finalUserId && !session.isOnboardingCompleted);
    
    if (existingSession) {
      return {
        sessionId: existingSession.sessionId,
        userId: existingSession.userId,
        currentPhase: existingSession.currentPhase,
        message: 'Resumed existing onboarding session'
      };
    }

    const onboardingData = this.createInitialOnboardingState(finalUserId);
    onboardingSessions.set(onboardingData.sessionId, onboardingData);
    
    return {
      sessionId: onboardingData.sessionId,
      userId: onboardingData.userId,
      currentPhase: onboardingData.currentPhase,
      message: 'Onboarding session started successfully'
    };
  }

  async getSession(sessionId) {
    return onboardingSessions.get(sessionId);
  }

  async saveProgress(sessionId, updateData) {
    const session = onboardingSessions.get(sessionId);
    
    if (!session) {
      return {
        success: false,
        statusCode: 404,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Onboarding session not found'
        }
      };
    }
    
    if (session.isOnboardingCompleted) {
      return {
        success: false,
        statusCode: 400,
        error: {
          code: 'ONBOARDING_ALREADY_COMPLETED',
          message: 'Cannot modify completed onboarding'
        }
      };
    }
    
    // Validate category expenses
    if (updateData.categoryExpenses) {
      const validationResult = this.validateCategoryExpenses(updateData.categoryExpenses);
      if (!validationResult.isValid) {
        return {
          success: false,
          statusCode: 400,
          error: validationResult.error
        };
      }
    }
    
    // Update session with new data
    const updatedSession = {
      ...session,
      ...updateData,
      lastUpdated: new Date().toISOString()
    };
    
    onboardingSessions.set(sessionId, updatedSession);
    
    return {
      success: true,
      data: {
        sessionId: updatedSession.sessionId,
        lastUpdated: updatedSession.lastUpdated,
        currentPhase: updatedSession.currentPhase,
        message: 'Progress saved successfully'
      }
    };
  }

  async completeOnboarding(sessionId) {
    const session = onboardingSessions.get(sessionId);
    
    if (!session) {
      return {
        success: false,
        statusCode: 404,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Onboarding session not found'
        }
      };
    }
    
    if (session.isOnboardingCompleted) {
      return {
        success: false,
        statusCode: 400,
        error: {
          code: 'ONBOARDING_ALREADY_COMPLETED',
          message: 'Onboarding already completed'
        }
      };
    }
    
    // Validate required fields
    const validationResult = this.validateCompletionRequirements(session);
    if (!validationResult.isValid) {
      return {
        success: false,
        statusCode: 400,
        error: validationResult.error
      };
    }
    
    // Generate financial plan
    const financialPlan = this.generateFinancialPlan(session);
    
    // Complete onboarding
    const completedSession = {
      ...session,
      isOnboardingCompleted: true,
      completedAt: new Date().toISOString(),
      currentPhase: 'complete',
      financialPlan
    };
    
    onboardingSessions.set(sessionId, completedSession);
    
    return {
      success: true,
      data: {
        sessionId: completedSession.sessionId,
        userId: completedSession.userId,
        completedAt: completedSession.completedAt,
        financialPlan,
        message: 'Onboarding completed successfully'
      }
    };
  }

  async resetOnboarding(sessionId) {
    if (!onboardingSessions.has(sessionId)) {
      return {
        success: false,
        statusCode: 404,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Onboarding session not found'
        }
      };
    }
    
    onboardingSessions.delete(sessionId);
    
    return {
      success: true,
      data: {
        message: 'Onboarding session reset successfully'
      }
    };
  }

  getCategories() {
    return AVAILABLE_CATEGORIES.map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      description: this.getCategoryDescription(category),
      icon: this.getCategoryIcon(category)
    }));
  }

  getActiveSessionsCount() {
    return onboardingSessions.size;
  }

  // Helper methods
  validateCategoryExpenses(categoryExpenses) {
    for (const [category, value] of Object.entries(categoryExpenses)) {
      if (!AVAILABLE_CATEGORIES.includes(category)) {
        return {
          isValid: false,
          error: {
            code: 'INVALID_CATEGORY',
            message: `Invalid category: ${category}`
          }
        };
      }
      
      if (value !== '' && (isNaN(value) || Number(value) < 0)) {
        return {
          isValid: false,
          error: {
            code: 'INVALID_EXPENSE_VALUE',
            message: `Invalid expense value for ${category}`
          }
        };
      }
    }
    
    return { isValid: true };
  }

  validateCompletionRequirements(session) {
    const requiredFields = ['primaryJobIncome', 'targetSavings'];
    
    for (const field of requiredFields) {
      if (!session[field] || session[field] === '') {
        return {
          isValid: false,
          error: {
            code: 'MISSING_REQUIRED_FIELD',
            message: `Missing required field: ${field}`
          }
        };
      }
    }
    
    return { isValid: true };
  }

  generateFinancialPlan(session) {
    const totalExpenses = Object.values(session.categoryExpenses)
      .filter(value => value !== '')
      .reduce((sum, value) => sum + Number(value), 0);
    
    const monthlyIncome = Number(session.primaryJobIncome) || 0;
    const targetSavings = Number(session.targetSavings) || 0;
    
    const recommendations = [];
    
    // Generate recommendations based on expenses
    for (const [category, amount] of Object.entries(session.categoryExpenses)) {
      if (amount && Number(amount) > 0) {
        const suggestion = this.generateCategoryRecommendation(category, Number(amount));
        if (suggestion) {
          recommendations.push(suggestion);
        }
      }
    }
    
    return {
      monthlyBudget: {
        totalExpenses,
        targetSavings,
        availableIncome: monthlyIncome,
        remainingIncome: monthlyIncome - totalExpenses - targetSavings
      },
      recommendations,
      savingsProjection: {
        timeFrame: session.timeFrame,
        monthlyTarget: targetSavings,
        isAchievable: (monthlyIncome - totalExpenses) >= targetSavings
      }
    };
  }

  generateCategoryRecommendation(category, amount) {
    const recommendations = {
      'Restaurants': {
        threshold: 300,
        suggestion: 'Consider cooking more meals at home',
        tips: ['Meal prep on weekends', 'Use grocery delivery to avoid impulse purchases']
      },
      'Groceries': {
        threshold: 600,
        suggestion: 'Look for ways to optimize grocery spending',
        tips: ['Use coupons and loyalty programs', 'Buy generic brands', 'Plan meals ahead']
      },
      'Credit Card Debt': {
        threshold: 200,
        suggestion: 'Focus on paying down credit card debt',
        tips: ['Pay more than minimum', 'Consider debt consolidation', 'Avoid new debt']
      }
    };
    
    const rec = recommendations[category];
    if (rec && amount > rec.threshold) {
      return {
        category,
        currentAmount: amount,
        suggestedAmount: Math.floor(amount * 0.8), // 20% reduction
        suggestion: rec.suggestion,
        tips: rec.tips
      };
    }
    
    return null;
  }

  getCategoryDescription(category) {
    const descriptions = {
      'Groceries': 'Food and household items',
      'Restaurants': 'Dining out and food delivery',
      'Credit Card Debt': 'Monthly credit card payments',
      'Utilities': 'Electricity, water, gas, internet',
      'Insurance': 'Health, auto, life insurance'
    };
    
    return descriptions[category] || '';
  }

  getCategoryIcon(category) {
    const icons = {
      'Groceries': 'shopping-cart',
      'Restaurants': 'utensils',
      'Credit Card Debt': 'credit-card',
      'Utilities': 'zap',
      'Insurance': 'shield'
    };
    
    return icons[category] || 'dollar-sign';
  }
}

module.exports = new OnboardingService();