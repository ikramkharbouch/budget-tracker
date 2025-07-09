import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onboardingSlice';
import apiMiddleware from './middleware/apiMiddleware';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(apiMiddleware.middleware),
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
