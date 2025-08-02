// eslint-disable-next-line no-unused-vars
import React from 'react';
import MessageDisplay from '../../__components__/message.display';
import { useMyOrderQuery } from '../../__redux__/api/order.api';
import StylishLoader from '../../__components__/stylish.loader';
import { generic_msg } from '../../__constants__/res.message';
import OrderCard from '../../__components__/cards/order.card';

const MyBooking = () => {
    const { data: Order, isLoading, isError } = useMyOrderQuery();

    if (isError) {
        return (
            <MessageDisplay
                message="No Order Found"
                type="error"
            />
        );
    }

    if (isLoading || !Order) {
        return (
            <StylishLoader
                size="large"
                color="#6c63ff"
            />
        );
    }

    return (
        <main>
            {Order.length !== 0 ? (
                <div className="booking_container">
                    {Order.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                        />
                    ))}
                </div>
            ) : (
                <MessageDisplay message={generic_msg.NO_ORDER_YET} />
            )}
        </main>
    );
};

export default MyBooking;
