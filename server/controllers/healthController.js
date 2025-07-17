const onboardingService = require('../services/onboardingService');

class HealthController {
  getHealth(req, res) {
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        activeSessions: onboardingService.getActiveSessionsCount(),
        version: process.env.npm_package_version || '1.0.0'
      }
    });
  }
}

module.exports = new HealthController();