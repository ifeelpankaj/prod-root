import React, { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import StylishLoader from './__components__/stylish.loader';
import { useFetchUser } from './__hooks__/fetch.user';
import 'react-loading-skeleton/dist/skeleton.css';
import ProtectedHook from './__hooks__/protected.hook';

import { useSelector } from 'react-redux';
// Lazy-loaded pages
const Auth = React.lazy(() => import('./__pages__/auth'));
const Home = lazy(() => import('./__pages__/home'));
const Profile = lazy(() => import('./__pages__/profile'));

const DisplayCabs = lazy(() => import('./__pages__/Passenger/display.cab'));
const PreviewBooking = lazy(() => import('./__pages__/Passenger/preview.booking'));
const MyBooking = lazy(() => import('./__pages__/Passenger/user.booking'));
const BookingDetails = lazy(() => import('./__pages__/Passenger/booking.details'));

const DriverOrderDetails = lazy(() => import('./__pages__/Driver/driver.order.details'));
const DriverCompletedBooking = lazy(() => import('./__pages__/Driver/booking.history'));
const PassengerHome = lazy(() => import('./__pages__/Passenger/Passenger.home'));
const NotFoundPage = lazy(() => import('./__pages__/not.found'));

// Non-lazy components
import Header from './__components__/header';

function App() {
    const { isLoading } = useFetchUser();
    const { user } = useSelector((state) => state.auth);

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        );
    }
    return (
        <>
            <Router>
                <Header />
                <Suspense
                    fallback={
                        <StylishLoader
                            size="large"
                            color="cyan"
                        />
                    }>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/home"
                            element={<PassengerHome />}
                        />
                        <Route
                            path="/auth"
                            element={
                                user ? (
                                    user.isVerified ? (
                                        <Navigate
                                            to="/user-profile"
                                            replace
                                        />
                                    ) : (
                                        <Auth />
                                    )
                                ) : (
                                    <Auth />
                                )
                            }
                        />
                        <Route
                            path="/user-profile"
                            element={
                                <ProtectedHook>
                                    <Profile />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/display-cabs"
                            element={
                                <ProtectedHook>
                                    <DisplayCabs />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/preview-booking/:id"
                            element={
                                <ProtectedHook roles={['Passenger']}>
                                    <PreviewBooking />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/bookings"
                            element={
                                <ProtectedHook roles={['Passenger']}>
                                    <MyBooking />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/booking/:id"
                            element={
                                <ProtectedHook roles={['Passenger', 'Driver', 'Admin']}>
                                    <BookingDetails />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/driver-order/:id"
                            element={
                                <ProtectedHook roles={['Driver', 'Admin']}>
                                    <DriverOrderDetails />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/my/bookings"
                            element={
                                <ProtectedHook roles={['Driver', 'Admin']}>
                                    <DriverCompletedBooking />
                                </ProtectedHook>
                            }
                        />
                        {/* Add the 404 route as the last route - it will catch all unmatched paths */}
                        <Route
                            path="*"
                            element={<NotFoundPage />}
                        />
                    </Routes>
                </Suspense>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
