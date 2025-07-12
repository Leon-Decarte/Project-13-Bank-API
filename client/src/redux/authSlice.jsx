// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue('Login failed');
    }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (token, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/profile`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue('Could not fetch profile');
    }
});

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // ✅ NOUVEAU : déconnexion
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
        // ✅ NOUVEAU : restaurer le token depuis localStorage
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            });
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
