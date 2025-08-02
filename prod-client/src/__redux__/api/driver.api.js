import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const server = import.meta.env.VITE_SERVER;
export const driverAPI = createApi({
    reducerPath: 'driverAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1`,
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
    tagTypes: ['users', 'orders', 'cabs', 'transactions'],
    endpoints: (builder) => ({
        documentVerification: builder.mutation({
            query: (doc) => {
                return {
                    url: '/driver/doc/verification',
                    method: 'PUT',
                    body: doc
                };
            },
            invalidatesTags: ['users']
        }),
        driverDashboardOrders: builder.query({
            query: () => `/driver/get/upcoming/bookings`,
            providesTags: ['cabs', 'users', 'orders'],
            transformResponse: (response) => {
                return response.data; // Assuming the actual data is in the 'data' property
            }
        }),
        driverWalletInfo: builder.query({
            query: () => `/driver/wallet-balance`,
            providesTags: ['cabs', 'users', 'orders'],
            transformResponse: (response) => {
                return response.data; // Assuming the actual data is in the 'data' property
            }
        }),
        driverTransactions: builder.query({
            query: ({ page, limit }) => ({
                url: '/driver/get-all-transaction',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['transactions']
        }),
        confirmBooking: builder.mutation({
            query: ({ orderId }) => ({
                url: '/driver/confirm-driver-booking',
                method: 'PUT',
                body: { orderId }
            }),
            invalidatesTags: ['users', 'cabs', 'orders']
        }),
        cancelBooking: builder.mutation({
            query: ({ orderId }) => ({
                url: '/driver/cancel-driver-booking',
                method: 'PUT',
                body: { orderId }
            }),
            invalidatesTags: ['users', 'cabs', 'orders']
        }),
        completeBooking: builder.mutation({
            query: ({ orderId }) => ({
                url: '/driver/complete-driver-booking',
                method: 'PUT',
                body: { orderId }
            }),
            invalidatesTags: ['users', 'cabs', 'orders']
        }),
        driverCompletedBooking: builder.query({
            query: ({ page, limit }) => ({
                url: '/driver/all/bookings',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['orders']
        })
    })
});

export const {
    useDocumentVerificationMutation,
    useDriverDashboardOrdersQuery,
    useDriverWalletInfoQuery,
    useDriverTransactionsQuery,
    useConfirmBookingMutation,
    useCompleteBookingMutation,
    useCancelBookingMutation,
    useDriverCompletedBookingQuery
} = driverAPI;
