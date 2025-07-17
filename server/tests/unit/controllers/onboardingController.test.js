const { validationResult } = require('express-validator');
const onboardingService = require('../../../services/onboardingService');
const OnboardingController = require('../../../controllers/onboardingController');
const fixtures = require('../../fixtures/onboardingData');

// Mock dependencies
jest.mock('express-validator');
jest.mock('../../../services/onboardingService');
jest.mock('../../../config/constants', () => require('../../mocks/constants'));

describe('OnboardingController', () => {
  let req, res;
  
  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Default validation result mock
    validationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => []
    });
  });

  describe('startOnboarding', () => {
    it('should start onboarding successfully', async () => {
      req.body = fixtures.validStartRequest;
      onboardingService.startOnboarding.mockResolvedValue(fixtures.validStartResponse);
      
      await OnboardingController.startOnboarding(req, res);
      
      expect(onboardingService.startOnboarding).toHaveBeenCalledWith('user_123456');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: fixtures.validStartResponse
      });
    });

    it('should return validation error for invalid input', async () => {
      const mockErrors = [
        { field: 'userId', message: 'userId is required' }
      ];
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => mockErrors
      });
      
      await OnboardingController.startOnboarding(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: mockErrors
        }
      });
    });

    it('should handle service errors', async () => {
      req.body = fixtures.validStartRequest;
      onboardingService.startOnboarding.mockRejectedValue(new Error('Database error'));
      
      await OnboardingController.startOnboarding(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to start onboarding session'
        }
      });
    });
  });

  describe('getProgress', () => {
    it('should get progress successfully', async () => {
      req.params.sessionId = 'session_789abc123';
      onboardingService.getSession.mockResolvedValue(fixtures.validSession);
      
      await OnboardingController.getProgress(req, res);
      
      expect(onboardingService.getSession).toHaveBeenCalledWith('session_789abc123');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: fixtures.validSession
      });
    });

    it('should return 404 for non-existent session', async () => {
      req.params.sessionId = 'invalid_session';
      onboardingService.getSession.mockResolvedValue(null);
      
      await OnboardingController.getProgress(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Onboarding session not found'
        }
      });
    });

    it('should handle service errors', async () => {
      req.params.sessionId = 'session_789abc123';
      onboardingService.getSession.mockRejectedValue(new Error('Database error'));
      
      await OnboardingController.getProgress(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to retrieve onboarding progress'
        }
      });
    });
  });

  describe('saveProgress', () => {
    it('should save progress successfully', async () => {
      req.params.sessionId = 'session_789abc123';
      req.body = fixtures.validProgressUpdate;
      
      const expectedResult = {
        success: true,
        data: { ...fixtures.validSession, ...fixtures.validProgressUpdate }
      };
      
      onboardingService.saveProgress.mockResolvedValue(expectedResult);
      
      await OnboardingController.saveProgress(req, res);
      
      expect(onboardingService.saveProgress).toHaveBeenCalledWith('session_789abc123', fixtures.validProgressUpdate);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expectedResult.data
      });
    });

    it('should return validation error for invalid input', async () => {
      const mockErrors = [
        { field: 'currentStep', message: 'currentStep must be a number' }
      ];
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => mockErrors
      });
      
      await OnboardingController.saveProgress(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: mockErrors
        }
      });
    });

    it('should handle service failure', async () => {
      req.params.sessionId = 'session_789abc123';
      req.body = fixtures.validProgressUpdate;
      
      onboardingService.saveProgress.mockResolvedValue({
        success: false,
        statusCode: 404,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Session not found'
        }
      });
      
      await OnboardingController.saveProgress(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Session not found'
        }
      });
    });
  });

  describe('completeOnboarding', () => {
    it('should complete onboarding successfully', async () => {
      req.params.sessionId = 'session_789abc123';
      
      const expectedResult = {
        success: true,
        data: fixtures.completedSession
      };
      
      onboardingService.completeOnboarding.mockResolvedValue(expectedResult);
      
      await OnboardingController.completeOnboarding(req, res);
      
      expect(onboardingService.completeOnboarding).toHaveBeenCalledWith('session_789abc123');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expectedResult.data
      });
    });

    it('should handle incomplete onboarding', async () => {
      req.params.sessionId = 'session_789abc123';
      
      onboardingService.completeOnboarding.mockResolvedValue({
        success: false,
        statusCode: 400,
        error: {
          code: 'INCOMPLETE_ONBOARDING',
          message: 'Onboarding session is not ready for completion'
        }
      });
      
      await OnboardingController.completeOnboarding(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INCOMPLETE_ONBOARDING',
          message: 'Onboarding session is not ready for completion'
        }
      });
    });
  });

  describe('getCategories', () => {
    it('should get categories successfully', async () => {
      onboardingService.getCategories.mockReturnValue(fixtures.validCategories);
      
      await OnboardingController.getCategories(req, res);
      
      expect(onboardingService.getCategories).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { categories: fixtures.validCategories }
      });
    });

    it('should handle service errors', async () => {
      onboardingService.getCategories.mockImplementation(() => {
        throw new Error('Service error');
      });
      
      await OnboardingController.getCategories(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to retrieve categories'
        }
      });
    });
  });

  describe('resetOnboarding', () => {
    it('should reset onboarding successfully', async () => {
      req.params.sessionId = 'session_789abc123';
      
      const expectedResult = {
        success: true,
        data: {
          message: 'Onboarding session reset successfully',
          sessionId: 'session_789abc123',
          resetAt: '2024-01-01T14:00:00.000Z'
        }
      };
      
      onboardingService.resetOnboarding.mockResolvedValue(expectedResult);
      
      await OnboardingController.resetOnboarding(req, res);
      
      expect(onboardingService.resetOnboarding).toHaveBeenCalledWith('session_789abc123');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expectedResult.data
      });
    });

    it('should handle non-existent session', async () => {
      req.params.sessionId = 'invalid_session';
      
      onboardingService.resetOnboarding.mockResolvedValue({
        success: false,
        statusCode: 404,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Session not found'
        }
      });
      
      await OnboardingController.resetOnboarding(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Session not found'
        }
      });
    });
  });
});
