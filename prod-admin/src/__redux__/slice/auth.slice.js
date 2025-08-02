import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunks/auth.thunk';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
// eslint-disable-next-line no-unneeded-ternary
const isAuthenticated = localStorage.getItem('token') ? true : false;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null,
        token,
        isAuthenticated
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        setCredentials: (state, { payload }) => {
            state.user = payload.data || payload; // Handle both payload.data and direct payload
            state.isAuthenticated = true;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', action.payload.data.role);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    }
});

export const { logout, setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
