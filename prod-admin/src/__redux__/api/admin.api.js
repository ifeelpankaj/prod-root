import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../store';

// Create API slice
export const adminAPI = createApi({
    reducerPath: 'adminAPI',
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
    tagTypes: ['Users', 'Orders', 'Cabs', 'Payments'],
    endpoints: (builder) => ({
        stats: builder.query({
            query: () => `/admin/stats`,
            providesTags: ['Users', 'Orders', 'Cabs'],
            transformResponse: (response) => {
                return response.data;
            }
        }),

        fetchAllCabs: builder.query({
            query: ({ page, limit }) => ({
                url: 'admin/cabs',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['Cabs']
        }),
        fetchAllUsers: builder.query({
            query: ({ page, limit, role }) => ({
                url: 'admin/users',
                method: 'GET',
                params: { page, limit, role }
            }),
            providesTags: ['Users']
        }),
        fetchAllDrivers: builder.query({
            query: ({ page, limit }) => ({
                url: 'admin/drivers',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['Users']
        }),
        fetchAllOrders: builder.query({
            query: ({ page, limit, bookingStatus }) => ({
                url: 'admin/orders',
                method: 'GET',
                params: {
                    page,
                    limit,
                    ...(bookingStatus && { bookingStatus })
                }
            }),
            providesTags: (result, error, arg) => [
                'Orders',
                // Create specific tags for filtered results
                ...(arg.bookingStatus ? [{ type: 'Orders', id: `status-${arg.bookingStatus}` }] : [{ type: 'Orders', id: 'all' }])
            ]
        }),
        fetchAllAssignedBooking: builder.query({
            query: ({ page, limit }) => ({
                url: 'admin/assign/booking',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['Orders']
        }),

        assignBooking: builder.mutation({
            query: ({ orderId, newCabId }) => ({
                url: `admin/assign/booking/${orderId}`,
                method: 'PATCH',
                body: { newCabId }
            }),
            invalidatesTags: ['Orders', 'Cabs']
        }),
        driverVerification: builder.mutation({
            query: (id) => ({
                url: `verify/driver/${id}`,
                method: 'PATCH' // Changed from GET to PATCH as verification should be a mutation
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }, 'Users', 'Cabs']
        }),

        allPendingPayment: builder.query({
            query: () => ({
                url: 'PendingPayment',
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.data;
            },
            providesTags: ['Payments']
        }),
        allUpcommingOrders: builder.query({
            query: ({ page, limit }) => ({
                url: 'admin/order/upcomming/bookings',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['Orders'],
            invalidatesTags: ['Orders', 'Users']
        }),
        adminModifyBooking: builder.mutation({
            query: ({ id, newData }) => {
                return {
                    url: `admin/order/modify/${id}`,
                    method: 'PUT',
                    body: newData
                };
            },
            invalidatesTags: ['Cabs', 'Orders']
        }),
        adminGetAvailableCabs: builder.query({
            query: ({ capacity, departureDate, dropOffDate, page, limit }) => {
                return {
                    url: `admin/free/cabs`,
                    method: 'GET',
                    params: {
                        capacity,
                        departureDate,
                        dropOffDate,
                        page,
                        limit
                    }
                };
            },
            invalidatesTags: ['Cabs', 'Orders']
        }),
        adminCancelBooking: builder.mutation({
            query: (id) => {
                return {
                    url: `admin/order/cancel/${id}`,
                    method: 'PATCH',
                    params: { id }
                };
            },
            invalidatesTags: ['Cabs', 'Orders', 'Users']
        }),
        getAllAdminDriver: builder.query({
            query: ({ page, limit, verified }) => ({
                url: 'admin/user/drivers',
                method: 'GET',
                params: { page, limit, verified }
            }),
            providesTags: ['Users']
        }),
        fetchCabBookingHistory: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/admin/cab/bookings/${id}`,
                method: 'GET',
                params: { page, limit }
            }),
            invalidatesTags: ['user', 'cabs', 'orders']
        })
    })
});

// Export hooks
export const {
    useStatsQuery,
    useAllPendingPaymentQuery,
    useAllUpcommingOrdersQuery,
    useDriverVerificationMutation, // Changed from Lazy query to mutation
    useGetDriverInfoQuery,
    useFetchAllAssignedBookingQuery,
    useGetAllAdminDriverQuery,
    useAssignBookingMutation,
    useFetchAllCabsQuery,
    useFetchAllUsersQuery,
    useFetchAllDriversQuery,
    useFetchAllOrdersQuery,
    useAdminModifyBookingMutation,
    useAdminGetAvailableCabsQuery,
    useAdminCancelBookingMutation
} = adminAPI;
