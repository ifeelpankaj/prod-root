import React from 'react';
import { setCredentials } from '../__redux__/slice/auth.slice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useMeQuery } from '../__redux__/api/auth.api';
import MessageDisplay from '../__components__/message.display';

export const useFetchUser = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useMeQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    });
    if (!data) {
        <MessageDisplay
            message="Login to access our servies !"
            type="info"
        />;
    }

    React.useEffect(() => {
        if (data) {
            dispatch(setCredentials(data));
        }
        if (error) {
            toast.info(error.message);
        }
    }, [data, error, dispatch]);

    return { error, isLoading };
};
