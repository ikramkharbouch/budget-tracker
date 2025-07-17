const { validationResult } = require('express-validator');
const onboardingService = require('../services/onboardingService');
const { AVAILABLE_CATEGORIES } = require('../config/constants');

class OnboardingController {
  async startOnboarding(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: errors.array(),
          },
        });
      }

      const { userId } = req.body;
      const result = await onboardingService.startOnboarding(userId);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error starting onboarding:', error);
      next(error);
    }
  }

  async getProgress(req, res, next) {
    try {
      const { sessionId } = req.params;
      const session = await onboardingService.getSession(sessionId);

      if (!session) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'SESSION_NOT_FOUND',
            message: 'Onboarding session not found',
          },
        });
      }

      res.json({
        success: true,
        data: session,
      });
    } catch (error) {
      console.error('Error retrieving onboarding progress:', error);
      next(error);
    }
  }

  async saveProgress(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: errors.array(),
          },
        });
      }

      const { sessionId } = req.params;
      const updateData = req.body;

      const result = await onboardingService.saveProgress(sessionId, updateData);

      if (!result.success) {
        return res.status(result.statusCode || 400).json({
          success: false,
          error: result.error,
        });
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      next(error);
    }
  }

  async completeOnboarding(req, res, next) {
    try {
      const { sessionId } = req.params;
      const result = await onboardingService.completeOnboarding(sessionId);

      if (!result.success) {
        return res.status(result.statusCode || 400).json({
          success: false,
          error: result.error,
        });
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = onboardingService.getCategories();

      res.json({
        success: true,
        data: { categories },
      });
    } catch (error) {
      console.error('Error getting categories:', error);
      next(error);
    }
  }

  async resetOnboarding(req, res, next) {
    try {
      const { sessionId } = req.params;
      const result = await onboardingService.resetOnboarding(sessionId);

      if (!result.success) {
        return res.status(result.statusCode || 404).json({
          success: false,
          error: result.error,
        });
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Error resetting onboarding:', error);
      next(error);
    }
  }
}

module.exports = new OnboardingController();
