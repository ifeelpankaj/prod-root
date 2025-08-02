// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Ban, CalendarClock, CircleCheckBig, ListOrdered, UserCheck, UserRoundX } from 'lucide-react';
import AdminSidebar from '../__components__/adminSidebar';

const OrderOperation = () => {
    const navigate = useNavigate();
    const handleTotalBooking = () => {
        navigate(`/admin/order/total-order`);
    };

    const handleUnassignedBooking = () => {
        navigate(`/admin/order/pending-order`);
    };

    const handleUpcommingBookigs = () => {
        navigate(`/admin/order/upcomming-order`);
    };

    const handleAssignBooking = () => {
        navigate(`/admin/order/assign-order`);
    };

    const handleCompletedBooking = () => {
        navigate(`/admin/order/completed-order`);
    };

    const handleCancelledBooking = () => {
        navigate(`/admin/order/cancelled-order`);
    };
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                <section className="services">
                    <h1>Order Management</h1>
                    <div className="services_cards-container">
                        <button
                            onClick={handleTotalBooking}
                            className="services_card cab-service_card--bookings">
                            <ListOrdered className="services_card__icon" />
                            <h3 className="services_card__title">Total Bookings</h3>
                            <p className="services_card__description">Browse and manage every booking in the system</p>
                        </button>
                        <button
                            onClick={handleUnassignedBooking}
                            className="services_card cab-service_card--delete">
                            <UserRoundX className="services_card__icon" />
                            <h3 className="services_card__title">Unassigned Bookings</h3>
                            <p className="services_card__description">View bookings not yet assigned to any cab.</p>
                        </button>
                        <button
                            onClick={handleAssignBooking}
                            className="services_card cab-service_card--update">
                            <UserCheck className="services_card__icon" />
                            <h3 className="services_card__title">Assigned Bookings</h3>
                            <p className="services_card__description">Check details for bookings already assigned to cabs.</p>
                        </button>

                        <button
                            onClick={handleCompletedBooking}
                            className="services_card cab_services_card--bookings-done">
                            <CircleCheckBig className="services_card__icon" />
                            <h3 className="services_card__title">Completed Booking</h3>
                            <p className="services_card__description">Review all bookings that have been completed.</p>
                        </button>

                        <button
                            onClick={handleUpcommingBookigs}
                            className="services_card cab_services_card--upcoming-bookings">
                            <CalendarClock className="services_card__icon" />
                            <h3 className="services_card__title">Upcoming/Current Bookings</h3>
                            <p className="services_card__description">See all bookings scheduled for the future.</p>
                        </button>
                        <button
                            onClick={handleCancelledBooking}
                            className="services_card cab_services_card--bookings-done">
                            <Ban className="services_card__icon" />
                            <h3 className="services_card__title">Cancelled Booking</h3>
                            <p className="services_card__description">Review all bookings that have been cancelled.</p>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default OrderOperation;
