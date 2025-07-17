const request = require('supertest');
const express = require('express');
const onboardingRoutes = require('../../../routes/onboarding');
const onboardingController = require('../../../controllers/onboardingController');
const fixtures = require('../../fixtures/onboardingData');

// Mock the controller
jest.mock('../../../controllers/onboardingController');

describe('Onboarding Routes', () => {
  let app;
  
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/onboarding', onboardingRoutes);
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('POST /api/v1/onboarding/start', () => {
    it('should call startOnboarding controller', async () => {
      onboardingController.startOnboarding.mockImplementation((req, res) => {
        res.json({ success: true, data: fixtures.validStartResponse });
      });
      
      const response = await request(app)
        .post('/api/v1/onboarding/start')
        .send(fixtures.validStartRequest);
      
      expect(response.status).toBe(200);
      expect(onboardingController.startOnboarding).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/onboarding/categories', () => {
    it('should call getCategories controller', async () => {
      onboardingController.getCategories.mockImplementation((req, res) => {
        res.json({ success: true, data: { categories: fixtures.validCategories } });
      });
      
      const response = await request(app)
        .get('/api/v1/onboarding/categories');
      
      expect(response.status).toBe(200);
      expect(onboardingController.getCategories).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/onboarding/:sessionId', () => {
    it('should call getProgress controller with sessionId', async () => {
      onboardingController.getProgress.mockImplementation((req, res) => {
        res.json({ success: true, data: fixtures.validSession });
      });
      
      const response = await request(app)
        .get('/api/v1/onboarding/session_789abc123');
      
      expect(response.status).toBe(200);
      expect(onboardingController.getProgress).toHaveBeenCalled();
    });
  });

  describe('PUT /api/v1/onboarding/:sessionId/progress', () => {
    it('should call saveProgress controller', async () => {
      onboardingController.saveProgress.mockImplementation((req, res) => {
        res.json({ success: true, data: fixtures.validSession });
      });
      
      const response = await request(app)
        .put('/api/v1/onboarding/session_789abc123/progress')
        .send(fixtures.validProgressUpdate);
      
      expect(response.status).toBe(200);
      expect(onboardingController.saveProgress).toHaveBeenCalled();
    });
  });

  describe('POST /api/v1/onboarding/:sessionId/complete', () => {
    it('should call completeOnboarding controller', async () => {
      onboardingController.completeOnboarding.mockImplementation((req, res) => {
        res.json({ success: true, data: fixtures.completedSession });
      });
      
      const response = await request(app)
        .post('/api/v1/onboarding/session_789abc123/complete');
      
      expect(response.status).toBe(200);
      expect(onboardingController.completeOnboarding).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/v1/onboarding/:sessionId', () => {
    it('should call resetOnboarding controller', async () => {
      onboardingController.resetOnboarding.mockImplementation((req, res) => {
        res.json({ 
          success: true, 
          data: {
            message: 'Onboarding session reset successfully',
            sessionId: 'session_789abc123',
            resetAt: '2024-01-01T14:00:00.000Z'
          }
        });
      });
      
      const response = await request(app)
        .delete('/api/v1/onboarding/session_789abc123');
      
      expect(response.status).toBe(200);
      expect(onboardingController.resetOnboarding).toHaveBeenCalled();
    });
  });

  describe('Route parameter validation', () => {
    it('should pass sessionId parameter to controller', async () => {
      const sessionId = 'test_session_123';
      
      onboardingController.getProgress.mockImplementation((req, res) => {
        expect(req.params.sessionId).toBe(sessionId);
        res.json({ success: true, data: fixtures.validSession });
      });
      
      await request(app)
        .get(`/api/v1/onboarding/${sessionId}`);
      
      expect(onboardingController.getProgress).toHaveBeenCalled();
    });
  });
});
