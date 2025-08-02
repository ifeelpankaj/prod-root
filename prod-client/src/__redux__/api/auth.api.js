import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const server = import.meta.env.VITE_SERVER;

// Create API slice
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: { token }
            } = getState();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('set-cookie', `token = ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['users', 'orders', 'cabs'],
    endpoints: (builder) => ({
        me: builder.query({
            query: () => '/user/me',
            providesTags: ['users']
        }),
        meId: builder.query({
            query: (id) => `/user/via/${id}`,
            providesTags: ['users'],
            transformResponse: (response) => {
                return response.data; // Assuming the actual data is in the 'data' property
            }
        }),
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/user/forget/password',
                method: 'POST',
                body: email
            }),
            invalidatesTags: ['users']
        }),
        resetPassword: builder.mutation({
            query: (otp, newPassword) => ({
                url: '/user/reset/password',
                method: 'PUT',
                body: otp,
                newPassword
            }),
            invalidatesTags: ['users']
        }),
        logout: builder.query({
            query: () => '/user/logout',
            invalidatesTags: ['users']
        })
    })
});

// Create async thunks

export const { useMeQuery, useMeIdQuery, useLazyLogoutQuery, useForgetPasswordMutation, useResetPasswordMutation } = authAPI;
