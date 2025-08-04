import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const server = import.meta.env.VITE_SERVER || `http://${window.location.hostname}:4000`;

// Create API slice
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1`,
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
    tagTypes: ['User', 'UserProfile', 'UserBooking', 'Auth'],
    endpoints: (builder) => ({
        //to get my profile
        me: builder.query({
            query: () => '/user/me',
            providesTags: ['UserProfile', 'Auth']
        }),
        //get user detail by Id or driver detail by id
        getUserById: builder.query({
            query: (id) => `/user/via/${id}`,
            providesTags: (result, error, id) => [
                { type: 'User', id },
                { type: 'User', id: 'LIST' }
            ],
            transformResponse: (response) => {
                return response.data; // Assuming the actual data is in the 'data' property
            }
        }),
        // logout current user
        logout: builder.query({
            query: () => '/user/logout',
            invalidatesTags: ['Auth', 'UserProfile']
        }),
        // route for forget password
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/user/forget/password',
                method: 'POST',
                body: { email }
            })
        }),
        //route for reset password
        resetPassword: builder.mutation({
            query: (otp, newPassword) => ({
                url: '/user/reset/password',
                method: 'PUT',
                body: otp,
                newPassword
            }),
            invalidatesTags: ['Auth']
        }),
        //route to get user booking histor by Id
        getUserBookingHistory: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/admin/user/booking/${id}`,
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: (result, error, { id }) => [
                { type: 'UserBooking', id },
                { type: 'UserBooking', id: 'LIST' }
            ]
        }),
        getUserUpcommingBookings: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/admin/user/upcomming/booking/${id}`,
                method: 'GET',
                params: { page, limit }
            })
        })
    })
});

// Create async thunks

export const {
    useMeQuery,
    useLazyLogoutQuery,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useGetUserByIdQuery,
    useGetUserBookingHistoryQuery,
    useGetUserUpcommingBookingsQuery
} = authAPI;
