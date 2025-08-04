import { createAsyncThunk } from '@reduxjs/toolkit';

const server = import.meta.env.VITE_SERVER;

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${server}/api/v1/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
