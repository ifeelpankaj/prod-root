import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../store';

// Create API slice
export const transactionAPI = createApi({
    reducerPath: 'transactionAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('set-cookie', `token = ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['transactions', 'orders'],
    endpoints: (builder) => ({
        getAllTransaction: builder.query({
            query: ({ page, limit, isPending }) => ({
                url: 'admin/transactions',
                method: 'GET',
                params: { page, limit, isPending }
            }),
            providesTags: ['transactions']
        }),
        getTransactionDetails: builder.query({
            query: (id) => ({
                url: `admin/transaction/${id}`,
                method: 'GET'
            }),
            providesTags: ['transactions'],
            transformResponse: (response) => {
                return response.data;
            }
        }),
        releasePayout: builder.mutation({
            query: ({ orderId, transactionId, amount }) => ({
                url: 'payout',
                method: 'POST',
                body: { orderId, transactionId, amount }
            }),
            invalidatesTags: ['Payments', 'Orders', 'Users']
        })
    })
});

// Create async thunks

export const { useReleasePayoutMutation, useGetAllTransactionQuery, useGetTransactionDetailsQuery } = transactionAPI;
