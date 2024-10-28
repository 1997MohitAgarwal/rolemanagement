// store.ts (or wherever you configure your Redux store)
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path as necessary

// Combine reducers if you have more than one slice
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
