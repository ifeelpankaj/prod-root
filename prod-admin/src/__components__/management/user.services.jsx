// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../__redux__/api/auth.api';
import AdminSidebar from '../adminSidebar';
import StylishLoader from '../loader';
import MessageDisplay from '../messageDisplay';
import { CalendarDays, FileCheck, ListChecks, ScanSearch } from 'lucide-react';

const UserServices = () => {
    const params = useParams();
    const { id } = params;
    const { data, isLoading, isError } = useGetUserByIdQuery(id);

    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate(`/admin/customer/${id}/details`);
    };

    const handleBookingHistory = () => {
        navigate(`/admin/customer/${id}/booking-history`);
    };

    const handleUpcomingBookings = () => {
        navigate(`/admin/customer/${id}/upcomming-bookings`);
    };

    const handleDocumentVerification = () => {
        navigate(`/admin/customer/${id}/dv`);
    };

    // Render buttons based on role
    const renderRoleSpecificButtons = () => {
        switch (data?.role) {
            case 'Admin':
                return (
                    <div className="services_cards-container">
                        <button
                            onClick={handleViewDetails}
                            className="services_card admin_services_card--view-details">
                            <ScanSearch className="services_card__icon" />
                            <h3 className="services_card__title">View User Details</h3>
                            <p className="services_card__description">View comprehensive user profile and information.</p>
                        </button>
                    </div>
                );

            case 'Passenger':
                return (
                    <div className="services_cards-container">
                        <button
                            onClick={handleViewDetails}
                            className="services_card cab-service_card--update">
                            <ScanSearch className="services_card__icon" />
                            <h3 className="services_card__title">View Profile Details</h3>
                            <p className="services_card__description">Check your profile information and settings.</p>
                        </button>

                        <button
                            onClick={handleBookingHistory}
                            className="services_card cab_services_card--upcoming-bookings">
                            <ListChecks className="services_card__icon" />
                            <h3 className="services_card__title">Booking History</h3>
                            <p className="services_card__description">View all your completed ride bookings and trips.</p>
                        </button>

                        <button
                            onClick={handleUpcomingBookings}
                            className="services_card ">
                            <CalendarDays className="services_card__icon cab_services_card--bookings-done" />
                            <h3 className="services_card__title">Upcoming Bookings</h3>
                            <p className="services_card__description">See all your scheduled future ride bookings.</p>
                        </button>
                    </div>
                );

            case 'Driver':
                return (
                    <div className="services_cards-container">
                        <button
                            onClick={handleViewDetails}
                            className="services_card driver_services_card--view-details">
                            <ScanSearch className="services_card__icon" />
                            <h3 className="services_card__title">View Driver Profile</h3>
                            <p className="services_card__description">Check driver profile, vehicle details and ratings.</p>
                        </button>

                        <button
                            onClick={handleBookingHistory}
                            className="services_card cab_services_card--bookings-done">
                            <ListChecks className="services_card__icon" />
                            <h3 className="services_card__title">Trip History</h3>
                            <p className="services_card__description">View all completed trips and earnings history.</p>
                        </button>

                        <button
                            onClick={handleDocumentVerification}
                            className="services_card cab-service_card--delete">
                            <FileCheck className="services_card__icon" />
                            <h3 className="services_card__title">Document Verification</h3>
                            <p className="services_card__description">Verify driver license, vehicle registration and other documents.</p>
                        </button>

                        <button
                            onClick={handleUpcomingBookings}
                            className="services_card cab_services_card--upcoming-bookings">
                            <CalendarDays className="services_card__icon" />
                            <h3 className="services_card__title">Upcoming Trips</h3>
                            <p className="services_card__description">See all scheduled trips and ride requests.</p>
                        </button>
                    </div>
                );

            default:
                return (
                    <MessageDisplay
                        type="warning"
                        message="Invalid user role. Please contact support."
                    />
                );
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {isLoading ? (
                    <StylishLoader
                        size="large"
                        color="cyan"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Failed to load user services. Please try again later."
                    />
                ) : (
                    <section className="services">
                        <h1>
                            {data?.role === 'Admin' && 'Customer Services'}
                            {data?.role === 'Passenger' && 'Passenger Services'}
                            {data?.role === 'Driver' && 'Driver Services'}
                        </h1>
                        {renderRoleSpecificButtons()}
                    </section>
                )}
            </main>
        </div>
    );
};
export default UserServices;
