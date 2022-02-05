import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, NEXT_URL } from '../../../config';
import authService from './authService';

const initialState = {
  user: null,
  isError: null,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register a new user!

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        const message = data.message;
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user!
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        const message = data.message;
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user!
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// USER PERSISTENCE!

export const checkUserLoggedIn = createAsyncThunk(
  'user-persistence',
  async (thunkAPI) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/user`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        const message = data.message;
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// UPDATE USERNAME!

export const updateUserProfile = createAsyncThunk(
  'auth/edit',
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/users/${data.id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({ username: data.name, email: data.email }),
      });
      const userData = await res.json();
      return userData;
    } catch (err) {
      const message = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.message = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.user;
        state.message = null;
      })
      .addCase(checkUserLoggedIn.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
      });
  },
});

export const { reset } = authReducer.actions;
export default authReducer.reducer;
