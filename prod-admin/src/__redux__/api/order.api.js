import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../store';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/booking`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Orders', 'Users', 'Cabs'],
    endpoints: (builder) => ({
        // 🔹 Fetch a single booking (admin or user)
        getOrderById: builder.query({
            query: (id) => `/customer/${id}`,
            providesTags: ['Orders'],
            transformResponse: (res) => res.data
        })
    })
});

export const {
    usePlaceOrderMutation,
    useVerifyPaymentMutation,
    useGetMyOrdersQuery,
    useGetOrderByIdQuery,
    useGetOrderForCustomerQuery,
    useGetPendingOrdersQuery
} = orderApi;
