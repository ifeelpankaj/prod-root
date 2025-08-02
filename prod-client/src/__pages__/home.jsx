// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import PassengerHome from './Passenger/Passenger.home';
import { useSelector } from 'react-redux';
import StylishLoader from '../__components__/stylish.loader';
import DriverHome from './Driver/driver.home';
import MessageDisplay from '../__components__/message.display';

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        <StylishLoader
            size="large"
            color="black"
        />;
    }
    const isPassenger = user?.role;
    if (!isPassenger) {
        <MessageDisplay
            type="error"
            message="Error fetching driver info"
        />;
    }

    return <div>{isPassenger === 'Passenger' ? <PassengerHome /> : <DriverHome />}</div>;
};

export default Home;
