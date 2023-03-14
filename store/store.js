import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-reducer';
import staffReducer from './staff/staff-reducer';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer
  }
});