// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import PassengerHome from './Passenger/Passenger.home';
import { useSelector } from 'react-redux';
import DriverHome from './Driver/driver.home';
import SafarCabHomePage from '../__components__/safar.cab.home';
import Services from '../__components__/services';
import Contact from '../__components__/contact';
import About from '../__components__/about';

const HeroSection = () => {
    return (
        <>
            <SafarCabHomePage />
            <Services />
            <About />
            <Contact />
        </>
    );
};

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    // Show hero section when user is not available
    if (!user) {
        return <HeroSection />;
    }

    const isPassenger = user?.role;

    return <div>{isPassenger === 'Passenger' ? <PassengerHome /> : <DriverHome />}</div>;
};

export default Home;
