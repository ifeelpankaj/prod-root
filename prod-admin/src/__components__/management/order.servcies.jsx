// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminSidebar from '../adminSidebar';
import StylishLoader from '../loader';
import MessageDisplay from '../messageDisplay';
import { Ban, FileSearch, PencilLine, UserPlus } from 'lucide-react';
import { useGetOrderByIdQuery } from '../../__redux__/api/order.api';
import { useNavigate, useParams } from 'react-router-dom';

const OrderServices = () => {
    const { id } = useParams();
    const { data: orderDetail, isLoading, isError } = useGetOrderByIdQuery(id);
    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate(`/admin/order/${id}/detail`);
    };
    const handleOrderAssignment = () => {
        navigate(`/admin/order/${id}/assign`);
    };
    const handleOrderUpdate = () => {
        navigate(`/admin/order/${id}/modify`);
    };
    const handleCancelOrder = () => {
        navigate(`/admin/order/${id}/cancel`);
    };

    const showActions = (() => {
        if (!orderDetail) return false;

        const validStatuses = ['Pending', 'Assigning', 'Confirmed'];
        const isFutureDate = new Date(orderDetail.departureDate) > new Date();

        return validStatuses.includes(orderDetail.bookingStatus) && isFutureDate;
    })();

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
                        message="Failed to load order services. Please try again later."
                    />
                ) : (
                    <section className="services">
                        <h1>Order Services Management</h1>
                        <div className="services_cards-container">
                            {/* Always visible */}
                            <button
                                onClick={handleViewDetails}
                                className="services_card cab-service_card--bookings">
                                <FileSearch className="services_card__icon" />
                                <h3 className="services_card__title">Order Overview</h3>
                                <p className="services_card__description">View all details related to a specific order.</p>
                            </button>

                            {/* Conditionally visible */}
                            {showActions && (
                                <>
                                    <button
                                        onClick={handleOrderUpdate}
                                        className="services_card cab-service_card--update">
                                        <PencilLine className="services_card__icon" />
                                        <h3 className="services_card__title">Modify Booking</h3>
                                        <p className="services_card__description">Edit order information like date, destination, or status.</p>
                                    </button>

                                    <button
                                        onClick={handleOrderAssignment}
                                        className="services_card cab_services_card--bookings-done">
                                        <UserPlus className="services_card__icon" />
                                        <h3 className="services_card__title">Assign a Cab</h3>
                                        <p className="services_card__description">Allocate a cab to fulfill this order.</p>
                                    </button>

                                    <button
                                        onClick={handleCancelOrder}
                                        className="services_card cab-service_card--delete">
                                        <Ban className="services_card__icon" />
                                        <h3 className="services_card__title">Cancel This Order</h3>
                                        <p className="services_card__description">Cancel this order and update its status.</p>
                                    </button>
                                </>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default OrderServices;
