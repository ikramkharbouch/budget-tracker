// store/middleware/apiMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { 
  completeOnboarding, 
  saveProgress, 
  setUserId 
} from '../slices/onboardingSlice';

const apiMiddleware = createListenerMiddleware();

apiMiddleware.startListening({
  actionCreator: completeOnboarding,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const onboardingData = state.onboarding;
    
    try {
      const response = await fetch('/api/users/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: onboardingData.userId || generateUserId(),
          selectedCategories: onboardingData.selectedCategories,
          categoryExpenses: onboardingData.categoryExpenses,
          primaryJobIncome: onboardingData.primaryJobIncome,
          targetSavings: onboardingData.targetSavings,
          timeFrame: onboardingData.timeFrame,
          reductionStrategy: onboardingData.reductionStrategy,
          completedAt: onboardingData.completedAt,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Onboarding data saved successfully:', result);
        
        if (result.userId && !onboardingData.userId) {
          listenerApi.dispatch(setUserId(result.userId));
        }
      } else {
        console.error('Failed to save onboarding data');
      }
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  },
});

apiMiddleware.startListening({
  actionCreator: saveProgress,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const onboardingData = state.onboarding;
    
    if (onboardingData.selectedCategories.length > 0 || onboardingData.primaryJobIncome) {
      try {
        await fetch('/api/users/onboarding/draft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: onboardingData.userId || generateUserId(),
            currentPhase: onboardingData.currentPhase,
            data: onboardingData,
            lastUpdated: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }
  },
});

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default apiMiddleware;