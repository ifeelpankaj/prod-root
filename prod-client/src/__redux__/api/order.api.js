import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const server = import.meta.env.VITE_SERVER;
export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: { token }
            } = getState();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['users', 'orders', 'cabs'],
    endpoints: (builder) => ({
        bookCab: builder.mutation({
            query: (orderDetails) => ({
                url: `/booking/place`,
                method: 'POST',
                body: orderDetails
            }),
            invalidatesTags: ['orders'],
            transformResponse: (response) => {
                return response.data;
            }
        }),
        paymentVerification: builder.mutation({
            query: ({ razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions }) => ({
                url: `/booking/payment/verification`,
                method: 'POST',
                body: {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    orderOptions
                },
                transformResponse: (response) => {
                    return response.data;
                }
            }),
            invalidatesTags: ['orders']
        }),
        myOrder: builder.query({
            query: () => ({
                url: '/booking/my',
                method: 'GET'
            }),
            providesTags: ['orders'],

            transformResponse: (response) => {
                return response.data;
            }
        }),
        orderDetail: builder.query({
            query: (id) => `/booking/customer/${id}`,
            providesTags: ['orders'],
            transformResponse: (response) => {
                return response.data;
            }
        })
    })
});

export const { useBookCabMutation, usePaymentVerificationMutation, useMyOrderQuery, useOrderDetailQuery } = orderAPI;
