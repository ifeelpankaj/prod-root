// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useFetchUser } from '../__hooks__/fetchUser';
import StylishLoader from './loader';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
    const { isLoading } = useFetchUser();

    if (isLoading) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <StylishLoader
                    size="large"
                    color="cyan"
                />
            </div>
        );
    }

    return children;
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default AuthProvider;
