import React from 'react';
import { useDispatch } from 'react-redux';
import { useMeQuery } from '../__redux__/api/auth.api';
import { setCredentials, clearCredentials } from '../__redux__/slice/auth.slice';
import { toast } from 'react-toastify';

export const useFetchUser = () => {
    const dispatch = useDispatch();
    const [hasAttempted, setHasAttempted] = React.useState(false);

    // Check if there's a token in localStorage/cookies before making API call
    const token = localStorage.getItem('token') || document.cookie.includes('token=');

    const { data, error, isLoading, isError } = useMeQuery(undefined, {
        skip: !token, // Skip query if no token exists
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: false // Prevent unnecessary refetches
    });

    React.useEffect(() => {
        if (!token && !hasAttempted) {
            setHasAttempted(true);
            return;
        }

        if (data && data.success) {
            dispatch(setCredentials(data.user || data));
            setHasAttempted(true);
        }

        if (isError || (error && !isLoading)) {
            // Clear credentials on error (token might be expired/invalid)
            dispatch(clearCredentials());
            localStorage.removeItem('token');
            setHasAttempted(true);

            // Only show error toast for actual authentication errors, not initial load
            if (hasAttempted && error?.status !== 401) {
                toast.error(error?.data?.message || 'Failed to fetch user data');
            }
        }
    }, [data, error, isError, isLoading, dispatch, token, hasAttempted]);

    return {
        error,
        isLoading: isLoading || !hasAttempted,
        isAuthenticated: !!data && !isError
    };
};
