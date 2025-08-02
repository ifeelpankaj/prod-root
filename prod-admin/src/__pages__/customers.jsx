// eslint-disable-next-line no-unused-vars
import React from 'react';
import { CarTaxiFront, User, Users, UserCog, UserRoundX } from 'lucide-react';
import AdminSidebar from '../__components__/adminSidebar';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
    const navigate = useNavigate();
    const handleTotalCustomer = () => {
        navigate(`/admin/customer/total-users`);
    };
    const handleAdmin = () => {
        navigate(`/admin/customer/total-admins`);
    };
    const handlePassenger = () => {
        navigate(`/admin/customer/total-passangers`);
    };
    const handleDriver = () => {
        navigate(`/admin/customer/total-drivers`);
    };
    const handleVerifiedDriver = () => {
        navigate(`/admin/customer/total-verified-drivers`);
    };
    const handleUnVerifiedDriver = () => {
        navigate(`/admin/customer/total-unverified-drivers`);
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                <section className="services">
                    <h1>User Management</h1>
                    <div className="services_cards-container">
                        <button
                            onClick={handleTotalCustomer}
                            className="services_card cab-service_card--bookings">
                            <Users className="services_card__icon" />
                            <h3 className="services_card__title">Total Customers</h3>
                            <p className="services_card__description">Browse and manage every user in the system</p>
                        </button>

                        <button
                            onClick={handlePassenger}
                            className="services_card cab_services_card--bookings-done">
                            <User className="services_card__icon" />
                            <h3 className="services_card__title">Passengers</h3>
                            <p className="services_card__description">Browse and manage every passenger in the system.</p>
                        </button>

                        <button
                            onClick={handleDriver}
                            className="services_card cab-service_card--update">
                            <CarTaxiFront className="services_card__icon" />
                            <h3 className="services_card__title">Drivers</h3>
                            <p className="services_card__description">Browse and manage every driver in the system.</p>
                        </button>
                        <button
                            onClick={handleAdmin}
                            className="services_card cab-service_card--delete">
                            <UserCog className="services_card__icon" />
                            <h3 className="services_card__title">Admins</h3>
                            <p className="services_card__description">Browse and manage every admin in the system.</p>
                        </button>
                        <button
                            onClick={handleUnVerifiedDriver}
                            className="services_card cab_services_card--upcoming-bookings">
                            <UserRoundX className="services_card__icon" />
                            <h3 className="services_card__title">Un Verified Drivers</h3>
                            <p className="services_card__description">Browse and manage every un verified driver in the system.</p>
                        </button>
                        <button
                            onClick={handleVerifiedDriver}
                            className="services_card cab-service_card--show">
                            <UserRoundX className="services_card__icon" />
                            <h3 className="services_card__title">Verified Drivers</h3>
                            <p className="services_card__description">Browse and manage every verified driver in the system.</p>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Customer;
