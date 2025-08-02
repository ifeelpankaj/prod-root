// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BadgeCheck, FileWarning, ListChecks } from 'lucide-react';
import AdminSidebar from '../__components__/adminSidebar';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
    const navigate = useNavigate();
    const handlePaidTransaction = () => {
        navigate('/admin/transactions/paid');
    };
    const handleUnpaidTransaction = () => {
        navigate('/admin/transactions/unpaid');
    };
    const handleTotalTransaction = () => {
        navigate('/admin/transactions/total');
    };
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                <section className="services">
                    <h1>Transaction Management</h1>
                    <div className="services_cards-container">
                        <button
                            onClick={handleTotalTransaction}
                            className="services_card cab_services_card--upcoming-bookings">
                            <ListChecks className="services_card__icon" />
                            <h3 className="services_card__title">Total Transaction</h3>
                            <p className="services_card__description">View a complete list of transactions.</p>
                        </button>
                        <button
                            onClick={handlePaidTransaction}
                            className="services_card cab-service_card--update">
                            <BadgeCheck className="services_card__icon" />
                            <h3 className="services_card__title">Paid Transaction</h3>
                            <p className="services_card__description">View a complete list of transactions that have been successfully paid.</p>
                        </button>
                        <button
                            onClick={handleUnpaidTransaction}
                            className="services_card cab-service_card--delete">
                            <FileWarning className="services_card__icon" />
                            <h3 className="services_card__title">UnPaid Transaction</h3>
                            <p className="services_card__description">Review transactions that are pending payment or incomplete.</p>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Transaction;
