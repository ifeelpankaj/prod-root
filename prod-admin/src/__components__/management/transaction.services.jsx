// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTransactionDetailsQuery } from '../../__redux__/api/transaction.api';
import AdminSidebar from '../adminSidebar';
import StylishLoader from '../loader';
import MessageDisplay from '../messageDisplay';
import { Banknote, FileSearch } from 'lucide-react';

const TransactionServices = () => {
    const { id } = useParams();
    const { data: details, isLoading, isError } = useGetTransactionDetailsQuery(id);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/admin/transaction/${id}/details`);
    };

    const handlePayout = () => {
        navigate(`/admin/transaction/${id}/payout`);
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
                        message="Failed to load order services. Please try again later."
                    />
                ) : (
                    <section className="services">
                        <h1>Transaction Services Management</h1>
                        <div className="services_cards-container">
                            {/* Always visible */}
                            <button
                                onClick={handleViewDetails}
                                className="services_card cab-service_card--bookings">
                                <FileSearch className="services_card__icon" />
                                <h3 className="services_card__title">Transaction Overview</h3>
                                <p className="services_card__description">View all details related to a specific transaaction.</p>
                            </button>

                            {details.isPending && (
                                <button
                                    onClick={handlePayout}
                                    className="services_card cab_services_card--bookings-done">
                                    <Banknote className="services_card__icon" />
                                    <h3 className="services_card__title">Payout</h3>
                                    <p className="services_card__description">Release driver payment.</p>
                                </button>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TransactionServices;
