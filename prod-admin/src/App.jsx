// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './__pages__/dashboard';
import StylishLoader from './__components__/loader';
import Login from './__pages__/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import AuthProvider from './__components__/authprovider';

import { AdminProtectedRoute, PublicRoute } from './__utils__/app.utils';
const NotFoundPage = lazy(() => import('./__components__/page.not.found'));

const Coupon = lazy(() => import('./__components__/apps/coupon'));
const Stopwatch = lazy(() => import('./__components__/apps/stopwatch'));
const Toss = lazy(() => import('./__components__/apps/toss'));
const TotalCabs = lazy(() => import('./__pages__/cabs'));
const CabServices = lazy(() => import('./__components__/management/cab.services'));
const CabDetails = lazy(() => import('./__pages__/services/cabs/cab.details'));
const CabHistory = lazy(() => import('./__pages__/services/cabs/cab.prevbooking'));
const CabUpcommingBooking = lazy(() => import('./__pages__/services/cabs/cab.upcomingbooking'));
const UpdateCab = lazy(() => import('./__pages__/services/cabs/cab.update'));
const DisplayCab = lazy(() => import('./__pages__/services/cabs/cab.display'));
const Customer = lazy(() => import('./__pages__/customers'));
const UserServices = lazy(() => import('./__components__/management/user.services'));
const UserDetails = lazy(() => import('./__pages__/services/users/user.details'));
const UserBookingHistory = lazy(() => import('./__pages__/services/users/user.orderhistory'));
const UserUpcommingOrder = lazy(() => import('./__pages__/services/users/user.upcommingorder'));
const DriverVerification = lazy(() => import('./__pages__/services/users/driver.dv'));
const OrderOperation = lazy(() => import('./__pages__/order'));
const TotalOrder = lazy(() => import('./__pages__/services/orders/order.total'));
const PendingBooking = lazy(() => import('./__pages__/services/orders/order.pending'));
const CompletedOrder = lazy(() => import('./__pages__/services/orders/order.completed'));
const AssignedOrder = lazy(() => import('./__pages__/services/orders/order.assign'));
const UpcommingBookings = lazy(() => import('./__pages__/services/orders/order.upcomming'));
const CancelledOrder = lazy(() => import('./__pages__/services/orders/order.cancel'));
const OrderServices = lazy(() => import('./__components__/management/order.servcies'));
const OrderAssignment = lazy(() => import('./__pages__/services/orders/_services/order.assign'));
const ModifyOrder = lazy(() => import('./__pages__/services/orders/_services/order.modify'));
const OrderDetails = lazy(() => import('./__pages__/services/orders/_services/order.detail'));
const OrderCancellation = lazy(() => import('./__pages__/services/orders/_services/order.cancel'));
const Transaction = lazy(() => import('./__pages__/transaction'));
const TransactionServices = lazy(() => import('./__components__/management/transaction.services'));
const TransactionDetials = lazy(() => import('./__pages__/services/transactions/transaction.details'));
const TransactionPayout = lazy(() => import('./__pages__/services/transactions/transaction.payout'));
const TotalCustomer = lazy(() => import('./__pages__/services/users/services/user.total'));
const TotalPassengers = lazy(() => import('./__pages__/services/users/services/user.passanger'));
const TotalDrivers = lazy(() => import('./__pages__/services/users/services/user.drivers'));
const TotalAdmins = lazy(() => import('./__pages__/services/users/services/user.admin'));
const TotalUnverifiedDrivers = lazy(() => import('./__pages__/services/users/services/user.driver.unverified'));
const TotalVerifiedDriver = lazy(() => import('./__pages__/services/users/services/user.driver.verified'));
const UnPaidTransaction = lazy(() => import('./__pages__/services/transactions/services/transaction.unpaid'));
const PaidTransaction = lazy(() => import('./__pages__/services/transactions/services/transaction.paid'));
const TotalTransaction = lazy(() => import('./__pages__/services/transactions/services/transaction.total'));
const AddDisplayCab = lazy(() => import('./__pages__/add.cab'));

const Unauthorized = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '1rem'
            }}>
            <h1>403 - Unauthorized</h1>
            <p>You dont have permission to access this page.</p>
            <p>Admin access required.</p>
            <button
                onClick={handleGoBack}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                Go Back
            </button>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense
                    fallback={
                        <div
                            style={{
                                height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <StylishLoader
                                size="large"
                                color="red"
                            />
                        </div>
                    }>
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />

                        {/* Unauthorized route */}
                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />

                        {/* Admin Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <AdminProtectedRoute>
                                    <Dashboard />
                                </AdminProtectedRoute>
                            }
                        />
                        {/* Cab Management */}
                        <Route
                            path="/admin/cabs"
                            element={
                                <AdminProtectedRoute>
                                    <TotalCabs />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/:id"
                            element={
                                <AdminProtectedRoute>
                                    <CabServices />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/:id/details"
                            element={
                                <AdminProtectedRoute>
                                    <CabDetails />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/:id/booking-history"
                            element={
                                <AdminProtectedRoute>
                                    <CabHistory />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/:id/upcoming-bookings"
                            element={
                                <AdminProtectedRoute>
                                    <CabUpcommingBooking />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/:id/update"
                            element={
                                <AdminProtectedRoute>
                                    <UpdateCab />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cab/display"
                            element={
                                <AdminProtectedRoute>
                                    <DisplayCab />
                                </AdminProtectedRoute>
                            }
                        />

                        {/* Customers Section */}
                        <Route
                            path="/admin/customer"
                            element={
                                <AdminProtectedRoute>
                                    <Customer />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-users"
                            element={
                                <AdminProtectedRoute>
                                    <TotalCustomer />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-passangers"
                            element={
                                <AdminProtectedRoute>
                                    <TotalPassengers />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-drivers"
                            element={
                                <AdminProtectedRoute>
                                    <TotalDrivers />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-admins"
                            element={
                                <AdminProtectedRoute>
                                    <TotalAdmins />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-unverified-drivers"
                            element={
                                <AdminProtectedRoute>
                                    <TotalUnverifiedDrivers />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/total-verified-drivers"
                            element={
                                <AdminProtectedRoute>
                                    <TotalVerifiedDriver />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/:id"
                            element={
                                <AdminProtectedRoute>
                                    <UserServices />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/:id/booking-history"
                            element={
                                <AdminProtectedRoute>
                                    <UserBookingHistory />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/:id/upcomming-bookings"
                            element={
                                <AdminProtectedRoute>
                                    <UserUpcommingOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/:id/details"
                            element={
                                <AdminProtectedRoute>
                                    <UserDetails />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/customer/:id/dv"
                            element={
                                <AdminProtectedRoute>
                                    <DriverVerification />
                                </AdminProtectedRoute>
                            }
                        />
                        {/* Orders */}
                        <Route
                            path="/admin/orders"
                            element={
                                <AdminProtectedRoute>
                                    <OrderOperation />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/total-order"
                            element={
                                <AdminProtectedRoute>
                                    <TotalOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/pending-order"
                            element={
                                <AdminProtectedRoute>
                                    <PendingBooking />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/completed-order"
                            element={
                                <AdminProtectedRoute>
                                    <CompletedOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/assign-order"
                            element={
                                <AdminProtectedRoute>
                                    <AssignedOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/upcomming-order"
                            element={
                                <AdminProtectedRoute>
                                    <UpcommingBookings />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/cancelled-order"
                            element={
                                <AdminProtectedRoute>
                                    <CancelledOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/:id"
                            element={
                                <AdminProtectedRoute>
                                    <OrderServices />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/:id/cancel"
                            element={
                                <AdminProtectedRoute>
                                    <OrderCancellation />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/:id/assign"
                            element={
                                <AdminProtectedRoute>
                                    <OrderAssignment />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/:id/modify"
                            element={
                                <AdminProtectedRoute>
                                    <ModifyOrder />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/order/:id/detail"
                            element={
                                <AdminProtectedRoute>
                                    <OrderDetails />
                                </AdminProtectedRoute>
                            }
                        />
                        {/* Transaction */}
                        <Route
                            path="/admin/transactions"
                            element={
                                <AdminProtectedRoute>
                                    <Transaction />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transactions/unpaid"
                            element={
                                <AdminProtectedRoute>
                                    <UnPaidTransaction />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transactions/total"
                            element={
                                <AdminProtectedRoute>
                                    <TotalTransaction />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transactions/paid"
                            element={
                                <AdminProtectedRoute>
                                    <PaidTransaction />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transaction/:id"
                            element={
                                <AdminProtectedRoute>
                                    <TransactionServices />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transaction/:id/details"
                            element={
                                <AdminProtectedRoute>
                                    <TransactionDetials />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/transaction/:id/payout"
                            element={
                                <AdminProtectedRoute>
                                    <TransactionPayout />
                                </AdminProtectedRoute>
                            }
                        />
                        {/* Quicker */}

                        <Route
                            path="/admin/quicker/add/display-cab"
                            element={
                                <AdminProtectedRoute>
                                    <AddDisplayCab />
                                </AdminProtectedRoute>
                            }
                        />
                        {/* Apps */}
                        <Route
                            path="/admin/app/coupon"
                            element={
                                <AdminProtectedRoute>
                                    <Coupon />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/app/stopwatch"
                            element={
                                <AdminProtectedRoute>
                                    <Stopwatch />
                                </AdminProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/app/toss"
                            element={
                                <AdminProtectedRoute>
                                    <Toss />
                                </AdminProtectedRoute>
                            }
                        />

                        {/* Catch all route */}
                        <Route
                            path="*"
                            element={<NotFoundPage />}
                        />
                    </Routes>
                </Suspense>

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
            </Router>
        </AuthProvider>
    );
}

export default App;
