import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth.slice';
import infoReducer from './slice/info.slice';
import { authAPI } from './api/auth.api';
import { cabAPI } from './api/cab.api';
import { otherAPI } from './api/other.api';
import { orderAPI } from './api/order.api';
import { driverAPI } from './api/driver.api';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [cabAPI.reducerPath]: cabAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [driverAPI.reducerPath]: driverAPI.reducer,
        [otherAPI.reducerPath]: otherAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(orderAPI.middleware)
            .concat(authAPI.middleware)
            .concat(cabAPI.middleware)
            .concat(otherAPI.middleware)
            .concat(driverAPI.middleware)
});
