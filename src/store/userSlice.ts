import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  role: string;
}

const initialState: UserState = {
  username: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string; role: string }>) {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    updateUserRole(state, action: PayloadAction<string>) { // Action to update the role
      state.role = action.payload; // Update the role based on the provided payload
    },
  },
});

export const { setUser, updateUserRole } = userSlice.actions;
export default userSlice.reducer;
