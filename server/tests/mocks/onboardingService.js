const onboardingFixtures = require('../fixtures/onboardingData');

const mockOnboardingService = {
  startOnboarding: jest.fn(),
  getSession: jest.fn(),
  saveProgress: jest.fn(),
  completeOnboarding: jest.fn(),
  getCategories: jest.fn(),
  resetOnboarding: jest.fn()
};

// Default mock implementations
mockOnboardingService.startOnboarding.mockResolvedValue(onboardingFixtures.validStartResponse);
mockOnboardingService.getSession.mockResolvedValue(onboardingFixtures.validSession);
mockOnboardingService.saveProgress.mockResolvedValue({
  success: true,
  data: { ...onboardingFixtures.validSession, ...onboardingFixtures.validProgressUpdate }
});
mockOnboardingService.completeOnboarding.mockResolvedValue({
  success: true,
  data: onboardingFixtures.completedSession
});
mockOnboardingService.getCategories.mockReturnValue(onboardingFixtures.validCategories);
mockOnboardingService.resetOnboarding.mockResolvedValue({
  success: true,
  data: {
    message: 'Onboarding session reset successfully',
    sessionId: 'session_789abc123',
    resetAt: '2024-01-01T14:00:00.000Z'
  }
});

module.exports = mockOnboardingService;

