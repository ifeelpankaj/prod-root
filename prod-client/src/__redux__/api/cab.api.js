import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const server = import.meta.env.VITE_SERVER;
export const cabAPI = createApi({
    reducerPath: 'cabAPI',
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
        displayPassengerCab: builder.query({
            query: () => ({
                url: '/cab/via/display',
                method: 'GET'
            }),
            providesTags: ['cabs'],

            transformResponse: (response) => {
                return response.data;
            }
        }),
        cabDetails: builder.query({
            query: (id) => `/cab/via/${id}`,
            providesTags: ['cabs'],
            transformResponse: (response) => {
                return response.data;
            }
        }),
        cabRegistration: builder.mutation({
            query: (cabData) => ({
                url: '/cab/register',
                method: 'POST',
                body: cabData
            }),
            invalidatesTags: ['cabs']
        }),
        getDriverOwnedCab: builder.query({
            query: () => '/cab/owned/by/driver',
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
        })
    })
});

export const { useDisplayPassengerCabQuery, useCabDetailsQuery, useCabRegistrationMutation, useGetDriverOwnedCabQuery, useUpdateCabMutation } =
    cabAPI;
