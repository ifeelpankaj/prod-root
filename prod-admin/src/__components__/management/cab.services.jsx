// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminSidebar from '../adminSidebar';
import { CalendarDays, Eye, EyeOff, ListChecks, PencilLine, ScanSearch, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCabDetailQuery, useLazyMakeCabReadyQuery } from '../../__redux__/api/cab.api';
import StylishLoader from '../loader';
import MessageDisplay from '../messageDisplay';

const CabServices = () => {
    const params = useParams();
    const { id } = params;
    const { data, isLoading, isError, refetch } = useCabDetailQuery(id);
    const [makeCabReady, { isLoading: loading }] = useLazyMakeCabReadyQuery();
    const navigate = useNavigate();

    const handleCabUpdate = () => {
        navigate(`/admin/cab/${id}/update`);
    };

    const handleBookingHistory = () => {
        navigate(`/admin/cab/${id}/booking-history`);
    };

    const handleUpcommingBookigs = () => {
        navigate(`/admin/cab/${id}/upcoming-bookings`);
    };

    const handleDeleteCab = () => {
        toast.info('Cab deletion service is under maintainance.');
    };

    const handleViewDetails = () => {
        navigate(`/admin/cab/${id}/details`);
    };

    const handleToggleCabReady = async () => {
        try {
            // Execute the lazy query when button is clicked
            const result = await makeCabReady(id);

            // Refetch the cab details to get updated data
            await refetch();

            // Use the message from backend response
            const message = result.data?.message || 'Cab status updated successfully';
            toast.success(message);
        } catch (error) {
            toast.error(`Failed to update cab status. Please try again.${error.message}`);
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
                        message="Failed to load cab services. Please try again later."
                    />
                ) : (
                    <section className="services">
                        <h1>Cab Services Management</h1>
                        <div className="services_cards-container">
                            <button
                                onClick={handleViewDetails}
                                className="services_card cab-service_card--bookings">
                                <ScanSearch className="services_card__icon" />
                                <h3 className="services_card__title">View Details</h3>
                                <p className="services_card__description">Check Cab Details.</p>
                            </button>

                            <button
                                onClick={handleCabUpdate}
                                className="services_card cab-service_card--update">
                                <PencilLine className="services_card__icon" />
                                <h3 className="services_card__title">Update Cab</h3>
                                <p className="services_card__description">Modify cab details, availability, or type.</p>
                            </button>

                            {data?.belongsTo?.role === 'Admin' && (
                                <button
                                    onClick={handleToggleCabReady}
                                    disabled={loading}
                                    className={`services_card ${data?.isReady ? 'cab-service_card--hide' : 'cab-service_card--show'}`}>
                                    {loading ? (
                                        <div className="spinner services_card__icon" />
                                    ) : data?.isReady ? (
                                        <EyeOff className="services_card__icon" />
                                    ) : (
                                        <Eye className="services_card__icon" />
                                    )}
                                    <h3 className="services_card__title">{loading ? 'Updating...' : data?.isReady ? 'Hide Cab' : 'Show Cab'}</h3>
                                    <p className="services_card__description">
                                        {data?.isReady ? 'Hide cab from user display.' : 'Make cab visible to users.'}
                                    </p>
                                </button>
                            )}

                            <button
                                onClick={handleBookingHistory}
                                className="services_card cab_services_card--bookings-done">
                                <ListChecks className="services_card__icon" />
                                <h3 className="services_card__title">Booking History</h3>
                                <p className="services_card__description">View all completed bookings for this cab.</p>
                            </button>

                            <button
                                onClick={handleUpcommingBookigs}
                                className="services_card cab_services_card--upcoming-bookings">
                                <CalendarDays className="services_card__icon" />
                                <h3 className="services_card__title">Upcoming Bookings</h3>
                                <p className="services_card__description">See all scheduled bookings for this cab.</p>
                            </button>

                            <button
                                onClick={handleDeleteCab}
                                className="services_card cab-service_card--delete">
                                <Trash2 className="services_card__icon" />
                                <h3 className="services_card__title">Delete Cab</h3>
                                <p className="services_card__description">Permanently remove this cab from the system.</p>
                            </button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default CabServices;
