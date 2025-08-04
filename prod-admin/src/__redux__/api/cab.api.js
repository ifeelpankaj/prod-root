import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const server = import.meta.env.VITE_SERVER || `http://${window.location.hostname}:4000`;

export const cabAPI = createApi({
    reducerPath: 'cabAPI',
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
    tagTypes: ['users', 'orders', 'cabs'],
    endpoints: (builder) => ({
        cabDetail: builder.query({
            query: (id) => `/cab/via/${id}`,
            providesTags: ['cabs'],
            transformResponse: (response) => {
                return response.data;
            }
        }),

        updateCab: builder.mutation({
            query: ({ id, newData }) => ({
                url: `/cab/update/${id}`,
                method: 'PUT',
                body: newData
            }),
            invalidatesTags: ['cabs']
        }),
        fetchCabBookingHistory: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/admin/cab/bookings/${id}`,
                method: 'GET',
                params: { page, limit }
            }),
            invalidatesTags: ['user', 'cabs', 'orders']
        }),
        fetchupcomingBookings: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/admin/cab/upcomming/booking/${id}`,
                method: 'GET',
                params: { page, limit }
            }),
            invalidatesTags: ['user', 'cabs', 'orders']
        }),
        fetchDisplayCabs: builder.query({
            query: () => ({
                url: '/cab/via/display',
                method: 'GET'
            }),
            providesTags: ['cabs']
        }),
        makeCabReady: builder.query({
            query: (id) => {
                return { url: `/make-cab/ready/${id}`, method: 'GET' };
            },
            invalidatesTags: ['cabs']
        }),
        cabRegistration: builder.mutation({
            query: (cabData) => ({
                url: '/cab/register',
                method: 'POST',
                body: cabData
            }),
            invalidatesTags: ['cabs']
        })
    })
});

export const {
    useCabDetailQuery,
    useUpdateCabMutation,
    useFetchCabBookingHistoryQuery,
    useFetchupcomingBookingsQuery,
    useFetchDisplayCabsQuery,
    useLazyMakeCabReadyQuery,
    useCabRegistrationMutation
} = cabAPI;
