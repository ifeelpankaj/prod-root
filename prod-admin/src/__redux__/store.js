import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth.slice';
import { authAPI } from './api/auth.api';
import { adminAPI } from './api/admin.api';
import { cabAPI } from './api/cab.api';
import { orderApi } from './api/order.api';
import { transactionAPI } from './api/transaction.api';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
        [cabAPI.reducerPath]: cabAPI.reducer,
        [transactionAPI.reducerPath]: transactionAPI.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(adminAPI.middleware)
            .concat(cabAPI.middleware)
            .concat(orderApi.middleware)
            .concat(transactionAPI.middleware)
});
