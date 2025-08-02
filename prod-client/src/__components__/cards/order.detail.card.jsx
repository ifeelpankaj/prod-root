/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
    FaMapMarker,
    FaFlagCheckered,
    FaCalendar,
    FaTags,
    FaUser,
    FaHourglassHalf,
    FaCreditCard,
    FaRupeeSign,
    FaWallet,
    FaCalculator,
    FaHashtag,
    FaExclamationTriangle,
    FaCheckCircle
} from 'react-icons/fa';
import Carousel from '../carousel';

import MessageDisplay from '../message.display';
import { generic_msg } from '../../__constants__/res.message';
import driver from '../../__assets__/driverImg.png';
import customer from '../../__assets__/userpic.png';

import Skeleton from 'react-loading-skeleton';

// const InfoItem = ({ icon: Icon, label, value }) => (
//     <div className={`info-item ${!Icon && !label ? 'only-value' : ''}`}>
//         {Icon && (
//             <span className="info-item__icon">
//                 <Icon />
//             </span>
//         )}
//         {label && <span className="info-item__label">{label}</span>}
//         <span className="info-item__value">{value}</span>
//     </div>
// );
// InfoItem.propTypes = {
//     icon: PropTypes.elementType,
//     label: PropTypes.string.isRequired,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
// };

// const JourneyPoint = ({ icon: Icon, title, location }) => (
//     <div className={`booking_journey-point booking_journey-point--${title.toLowerCase()}`}>
//         {Icon && <Icon />}
//         <h3>{title}</h3>
//         <p>{location}</p>
//     </div>
// );

// JourneyPoint.propTypes = {
//     icon: PropTypes.elementType,
//     title: PropTypes.string.isRequired,
//     location: PropTypes.string.isRequired
// };

// export const JourneySection = ({ order, isLoading }) => {
//     if (isLoading) {
//         return (
//             <StylishLoader
//                 size="large"
//                 color="red"
//             />
//         );
//     }

//     if (!order) {
//         return (
//             <MessageDisplay
//                 type="error"
//                 message="Booking not found"
//             />
//         );
//     }

//     return (
//         <section className="booking_booking-detail__journey">
//             <div className="booking_journey-card">
//                 <div className="booking_journey-card__path">
//                     <JourneyPoint
//                         icon={FaMapMarker}
//                         title="From"
//                         location={order.exactLocation || order.pickupLocation}
//                     />
//                     <div className="booking_journey-line"></div>
//                     <JourneyPoint
//                         icon={FaFlagCheckered}
//                         title="To"
//                         location={order.destination}
//                     />
//                 </div>
//                 <div className="booking_journey-card__info">
//                     <InfoItem
//                         icon={FaCalendar}
//                         label="Departure"
//                         value={new Date(order.departureDate).toLocaleDateString()}
//                     />
//                     <InfoItem
//                         icon={FaTags}
//                         label="Ride"
//                         value={order.bookingType}
//                     />
//                     {order.bookingType !== 'RoundTrip' ? (
//                         <InfoItem
//                             icon={FaUser}
//                             label="Passengers"
//                             value={order.numberOfPassengers}
//                         />
//                     ) : (
//                         <InfoItem
//                             icon={FaCalendar}
//                             label="Return ➡️"
//                             value={new Date(order.dropOffDate).toLocaleDateString()}
//                         />
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// JourneySection.propTypes = {
//     order: PropTypes.shape({
//         exactLocation: PropTypes.string,
//         pickupLocation: PropTypes.string,
//         destination: PropTypes.string.isRequired,
//         departureDate: PropTypes.string.isRequired,
//         bookingType: PropTypes.string.isRequired,
//         dropOffDate: PropTypes.string,
//         numberOfPassengers: PropTypes.number.isRequired
//     }),
//     isLoading: PropTypes.bool.isRequired
// };

// export const CabDetails = ({ cab, isLoading }) => {
//     if (isLoading) {
//         return (
//             <StylishLoader
//                 size="large"
//                 color="red"
//             />
//         );
//     }

//     if (!cab) {
//         return (
//             <MessageDisplay
//                 type="error"
//                 message="Cab Details are missing"
//             />
//         );
//     }
//     const capacity = `${cab.capacity} seater`;
//     return (
//         <section className="booking_booking-detail__ride">
//             <h2>Your Ride</h2>
//             <div className="booking_cab-card">
//                 {/* Note: Your data doesn't include photos, so we'll show a placeholder or hide this */}
//                 {cab.photos && cab.photos.length > 0 && <Carousel images={cab.photos} />}
//                 <div className="booking_cab-card__info">
//                     <InfoItem
//                         // icon={IoIosArrowRoundForward}
//                         label=""
//                         value={cab.cabNumber || 'N/A'}
//                     />
//                     <InfoItem
//                         // icon={IoIosArrowRoundForward}
//                         label=""
//                         value={capacity || 'N/A'}
//                     />
//                     <InfoItem
//                         // icon={IoIosArrowRoundForward}
//                         label=""
//                         value={cab.feature || 'N/A'}
//                     />
//                     <InfoItem
//                         // icon={IoIosArrowRoundForward}
//                         label=""
//                         value={cab.availability || 'N/A'}
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };

// CabDetails.propTypes = {
//     cab: PropTypes.shape({
//         photos: PropTypes.arrayOf(
//             PropTypes.shape({
//                 url: PropTypes.string.isRequired
//             })
//         ),
//         cabNumber: PropTypes.string,
//         capacity: PropTypes.number,
//         feature: PropTypes.string,
//         availability: PropTypes.string
//     }),
//     isLoading: PropTypes.bool.isRequired
// };

// const DriverAvatar = ({ driverData }) =>
//     driverData?.avatar?.url ? (
//         <img
//             src={driverData.avatar.url}
//             alt={driverData.username}
//             className="booking_driver-card__avatar"
//         />
//     ) : (
//         <img
//             src={img}
//             alt={driverData.username}
//             className="booking_driver-card__avatar"
//         />
//     );

// DriverAvatar.propTypes = {
//     driverData: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//         avatar: PropTypes.shape({
//             url: PropTypes.string
//         })
//     }).isRequired
// };

// const DriverInfo = ({ driverData }) => (
//     <div className="booking_driver-card">
//         <DriverAvatar driverData={driverData} />
//         <div className="booking_driver-card__info">
//             <h3>{driverData.username}</h3>
//             <div className="booking_driver-card__info-items">
//                 <InfoItem
//                     // icon={FaEnvelope}
//                     label="Email ➡️"
//                     value={driverData.email || 'N/A'}
//                 />
//                 <InfoItem
//                     // icon={FaPhone}
//                     label="Phone ➡️"
//                     value={driverData.phoneNumber || 'N/A'}
//                 />
//             </div>
//         </div>
//     </div>
// );

// DriverInfo.propTypes = {
//     driverData: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//         email: PropTypes.string,
//         phoneNumber: PropTypes.number,
//         avatar: PropTypes.shape({
//             url: PropTypes.string
//         })
//     }).isRequired
// };

// const PendingDriverInfo = () => (
//     <div className="booking_driver-pending">
//         <FaHourglassHalf aria-hidden="true" />
//         <h3>Assigning Your Driver</h3>
//         <p>
//             We are working on finding the perfect driver for your journey. This may take up to 3-4 hours. We will notify you via WhatsApp once a
//             driver is assigned.
//         </p>
//     </div>
// );

// export const DriverDetails = ({ orderDetail, isLoading }) => {
//     if (isLoading) {
//         return (
//             <StylishLoader
//                 size="large"
//                 color="black"
//             />
//         );
//     }

//     if (!orderDetail) {
//         return (
//             <MessageDisplay
//                 type="error"
//                 message="No order data available!"
//             />
//         );
//     }

//     const dropOffDate = new Date(orderDetail.dropOffDate);
//     const now = new Date();
//     const isNotCompleted = dropOffDate < now && (orderDetail.bookingStatus === 'Pending' || orderDetail.bookingStatus === 'Assigning');
//     const isCompleted = dropOffDate < now && orderDetail.bookingStatus === 'Completed';
//     const isCancelled = orderDetail.bookingStatus === 'Cancelled';
//     if (isCancelled) {
//         return (
//             <MessageDisplay
//                 type="info"
//                 message={generic_msg.order_cancelled}
//             />
//         );
//     }
//     if (isCompleted) {
//         return (
//             <MessageDisplay
//                 type="info"
//                 message="Your booking is completed successfully"
//             />
//         );
//     }

//     if (isNotCompleted) {
//         return (
//             <MessageDisplay
//                 type="info"
//                 message="We are sorry that we are unable to complete your booking. If you have paid the amount, it will be refunded back to you within 2 to 3
//                 working days. Sorry for the inconvenience."
//             />
//         );
//     }

//     const isPending = orderDetail.bookingStatus === 'Pending';
//     const driverData = orderDetail.driverId;

//     return (
//         <section className="booking_booking-detail__driver">
//             <h2>Driver Information</h2>
//             {isPending || !driverData ? <PendingDriverInfo /> : <DriverInfo driverData={driverData} />}
//         </section>
//     );
// };

// DriverDetails.propTypes = {
//     orderDetail: PropTypes.shape({
//         bookingStatus: PropTypes.string.isRequired,
//         dropOffDate: PropTypes.string.isRequired,
//         driverId: PropTypes.shape({
//             username: PropTypes.string.isRequired,
//             email: PropTypes.string,
//             phoneNumber: PropTypes.number,
//             avatar: PropTypes.shape({
//                 url: PropTypes.string
//             })
//         })
//     }),
//     isLoading: PropTypes.bool.isRequired
// };

// const PassengerCard = ({ passenger }) => (
//     <div className="booking_passenger-card">
//         <div className="booking_passenger-card__avatar">
//             {passenger.firstName[0]}
//             {passenger.lastName[0]}
//         </div>
//         <div className="booking_passenger-card__info">
//             <h3>
//                 {passenger.firstName} {passenger.lastName}
//             </h3>
//             <p>
//                 {passenger.gender}, {passenger.age || 'N/A'} years old
//             </p>
//         </div>
//     </div>
// );

// PassengerCard.propTypes = {
//     passenger: PropTypes.shape({
//         firstName: PropTypes.string.isRequired,
//         lastName: PropTypes.string.isRequired,
//         gender: PropTypes.string.isRequired,
//         age: PropTypes.number
//     }).isRequired
// };

// export const PassengersSection = ({ passangerInfo, isLoading }) => {
//     if (isLoading) {
//         return (
//             <StylishLoader
//                 size="large"
//                 color="green"
//             />
//         );
//     }

//     if (!passangerInfo?.passengers || passangerInfo.passengers.length === 0) {
//         return (
//             <MessageDisplay
//                 type="info"
//                 message="Passenger Details are not available"
//             />
//         );
//     }

//     return (
//         <section className="booking_booking-detail__passengers">
//             <h2>Passenger Details</h2>
//             <div className="booking_passengers-list">
//                 {passangerInfo.passengers.map((passenger) => (
//                     <PassengerCard
//                         key={passenger._id}
//                         passenger={passenger}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// PassengersSection.propTypes = {
//     passangerInfo: PropTypes.shape({
//         passengers: PropTypes.arrayOf(
//             PropTypes.shape({
//                 _id: PropTypes.string.isRequired,
//                 firstName: PropTypes.string.isRequired,
//                 lastName: PropTypes.string.isRequired,
//                 gender: PropTypes.string.isRequired,
//                 age: PropTypes.number
//             })
//         )
//     }),
//     isLoading: PropTypes.bool.isRequired
// };

// const PaymentInfo = ({ icon: Icon, label, value, style }) => (
//     <div
//         className="booking_payment-card__amount"
//         style={style}>
//         <Icon />
//         <h3>{label}</h3>
//         <p>{value}</p>
//     </div>
// );

// PaymentInfo.propTypes = {
//     icon: PropTypes.elementType.isRequired,
//     label: PropTypes.string.isRequired,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     style: PropTypes.object
// };

// export const PaymentSection = ({ paymentInfo, isLoading }) => {
//     if (isLoading) {
//         return (
//             <StylishLoader
//                 size="large"
//                 color="blue"
//             />
//         );
//     }

//     if (!paymentInfo) {
//         return (
//             <MessageDisplay
//                 type="error"
//                 message="Payment detials aare missing !"
//             />
//         );
//     }

//     return (
//         <section className="booking_booking-detail__payment">
//             <h2>Payment Details</h2>
//             <div className="booking_payment-card">
//                 <PaymentInfo
//                     icon={FaCreditCard}
//                     label="Method"
//                     value={paymentInfo.paymentMethod}
//                 />
//                 <PaymentInfo
//                     icon={FaRupeeSign}
//                     label="Amount Paid"
//                     value={`₹ ${paymentInfo.paidAmount}`}
//                     style={{ color: 'green' }}
//                 />
//                 <PaymentInfo
//                     icon={FaWallet}
//                     label="Amount Remaining"
//                     value={`₹ ${paymentInfo.bookingAmount - paymentInfo.paidAmount}`}
//                     style={{ color: 'red' }}
//                 />
//                 <PaymentInfo
//                     icon={FaCalculator}
//                     label="Total Amount"
//                     value={`₹ ${paymentInfo.bookingAmount}`}
//                 />
//                 {paymentInfo.paymentMethod !== 'Cash' && (
//                     <PaymentInfo
//                         icon={FaHashtag}
//                         label="Transaction ID"
//                         value={paymentInfo.razorpayOrderId || 'N/A'}
//                     />
//                 )}
//                 <PaymentInfo
//                     icon={paymentInfo.paymentStatus !== 'Paid' ? FaExclamationTriangle : FaCheckCircle}
//                     label="Payment Status"
//                     value={paymentInfo.paymentStatus}
//                     style={paymentInfo.paymentStatus !== 'Paid' ? { color: 'red' } : { color: 'green' }}
//                 />
//             </div>
//         </section>
//     );
// };

// PaymentSection.propTypes = {
//     paymentInfo: PropTypes.shape({
//         paymentMethod: PropTypes.string.isRequired,
//         paidAmount: PropTypes.number.isRequired,
//         bookingAmount: PropTypes.number.isRequired,
//         razorpayOrderId: PropTypes.string,
//         paymentStatus: PropTypes.string.isRequired
//     }),
//     isLoading: PropTypes.bool.isRequired
// };
const InfoItem = ({ icon: Icon, label, value }) => (
    <div className={`info-item ${!Icon && !label ? 'only-value' : ''}`}>
        {Icon && (
            <span className="info-item__icon">
                <Icon />
            </span>
        )}
        {label && <span className="info-item__label">{label}</span>}
        <span className="info-item__value">{value}</span>
    </div>
);
InfoItem.propTypes = {
    icon: PropTypes.elementType,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
const JourneyPoint = ({ icon: Icon, title, location }) => (
    <div className={`booking_journey-point booking_journey-point--${title.toLowerCase()}`}>
        {Icon && <Icon />}
        <h3>{title}</h3>
        <p>{location}</p>
    </div>
);
JourneyPoint.propTypes = {
    icon: PropTypes.elementType,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};
// Skeleton component for Journey Section
const JourneySectionSkeleton = () => (
    <section className="booking_booking-detail__journey">
        <div className="booking_journey-card">
            <div className="booking_journey-card__path">
                <div className="booking_journey-point">
                    <Skeleton
                        height={20}
                        width={20}
                        style={{ borderRadius: '50%' }}
                    />
                    <Skeleton
                        height={20}
                        width={60}
                    />
                    <Skeleton
                        height={16}
                        width={20}
                    />
                </div>
                <div className="booking_journey-line">
                    <Skeleton
                        height={40}
                        width={2}
                    />
                </div>
                <div className="booking_journey-point">
                    <Skeleton
                        height={20}
                        width={20}
                        style={{ borderRadius: '50%' }}
                    />
                    <Skeleton
                        height={20}
                        width={40}
                    />
                    <Skeleton
                        height={16}
                        width={100}
                    />
                </div>
            </div>
            <div className="booking_journey-card__info">
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={16}
                    />
                    <Skeleton
                        height={16}
                        width={80}
                    />
                    <Skeleton
                        height={16}
                        width={100}
                    />
                </div>
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={16}
                    />
                    <Skeleton
                        height={16}
                        width={60}
                    />
                    <Skeleton
                        height={16}
                        width={80}
                    />
                </div>
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={16}
                    />
                    <Skeleton
                        height={16}
                        width={90}
                    />
                    <Skeleton
                        height={16}
                        width={70}
                    />
                </div>
            </div>
        </div>
    </section>
);

export const JourneySection = ({ order, isLoading }) => {
    if (isLoading) {
        return <JourneySectionSkeleton />;
    }

    if (!order) {
        return (
            <MessageDisplay
                type="error"
                message="Booking not found"
            />
        );
    }

    return (
        <section className="booking_booking-detail__journey">
            <div className="booking_journey-card">
                <div className="booking_journey-card__path">
                    <JourneyPoint
                        icon={FaMapMarker}
                        title="From"
                        location={order.exactLocation || order.pickupLocation}
                    />
                    <div className="booking_journey-line"></div>
                    <JourneyPoint
                        icon={FaFlagCheckered}
                        title="To"
                        location={order.destination}
                    />
                </div>
                <div className="booking_journey-card__info">
                    <InfoItem
                        icon={FaCalendar}
                        label="Departure"
                        value={new Date(order.departureDate).toLocaleDateString()}
                    />
                    <InfoItem
                        icon={FaTags}
                        label="Ride"
                        value={order.bookingType}
                    />
                    {order.bookingType !== 'RoundTrip' ? (
                        <InfoItem
                            icon={FaUser}
                            label="Passengers"
                            value={order.numberOfPassengers}
                        />
                    ) : (
                        <InfoItem
                            icon={FaCalendar}
                            label="Return ➡️"
                            value={new Date(order.dropOffDate).toLocaleDateString()}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
JourneySection.propTypes = {
    order: PropTypes.shape({
        exactLocation: PropTypes.string,
        pickupLocation: PropTypes.string,
        destination: PropTypes.string.isRequired,
        departureDate: PropTypes.string.isRequired,
        bookingType: PropTypes.string.isRequired,
        dropOffDate: PropTypes.string,
        numberOfPassengers: PropTypes.number.isRequired
    }),
    isLoading: PropTypes.bool.isRequired
};
// Skeleton component for Cab Details
const CabDetailsSkeleton = () => (
    <section className="booking_booking-detail__ride">
        <Skeleton
            height={28}
            width={120}
        />
        <div className="booking_cab-card">
            <Skeleton
                height={200}
                width="100%"
            />
            <div className="booking_cab-card__info">
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={100}
                    />
                </div>
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={80}
                    />
                </div>
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={120}
                    />
                </div>
                <div className="info-item">
                    <Skeleton
                        height={16}
                        width={90}
                    />
                </div>
            </div>
        </div>
    </section>
);

export const CabDetails = ({ cab, isLoading }) => {
    if (isLoading) {
        return <CabDetailsSkeleton />;
    }

    if (!cab) {
        return (
            <MessageDisplay
                type="error"
                message="Cab Details are missing"
            />
        );
    }
    const capacity = `${cab.capacity} seater`;
    return (
        <section className="booking_booking-detail__ride">
            <h2>Your Ride</h2>
            <div className="booking_cab-card">
                {/* Note: Your data doesn't include photos, so we'll show a placeholder or hide this */}
                {cab.photos && cab.photos.length > 0 && <Carousel images={cab.photos} />}
                <div className="booking_cab-card__info">
                    <InfoItem
                        // icon={IoIosArrowRoundForward}
                        label=""
                        value={cab.cabNumber || 'N/A'}
                    />
                    <InfoItem
                        // icon={IoIosArrowRoundForward}
                        label=""
                        value={capacity || 'N/A'}
                    />
                    <InfoItem
                        // icon={IoIosArrowRoundForward}
                        label=""
                        value={cab.feature || 'N/A'}
                    />
                    <InfoItem
                        // icon={IoIosArrowRoundForward}
                        label=""
                        value={cab.availability || 'N/A'}
                    />
                </div>
            </div>
        </section>
    );
};

CabDetails.propTypes = {
    cab: PropTypes.shape({
        photos: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ),
        cabNumber: PropTypes.string,
        capacity: PropTypes.number,
        feature: PropTypes.string,
        availability: PropTypes.string
    }),
    isLoading: PropTypes.bool.isRequired
};

const DriverAvatar = ({ driverData, isDriver }) =>
    driverData?.avatar?.url ? (
        <img
            src={driverData.avatar.url}
            alt={driverData.username}
            className="booking_driver-card__avatar"
        />
    ) : (
        <img
            src={isDriver ? customer : driver}
            alt={driverData.username}
            className="booking_driver-card__avatar"
        />
    );

DriverAvatar.propTypes = {
    driverData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired,
    isDriver: PropTypes.bool
};
const DriverInfo = ({ driverData, isDriver }) => (
    <div className="booking_driver-card">
        <DriverAvatar
            driverData={driverData}
            isDriver={isDriver}
        />
        <div className="booking_driver-card__info">
            <h3>{driverData.username}</h3>
            <div className="booking_driver-card__info-items">
                <InfoItem
                    // icon={FaEnvelope}
                    label="Email ➡️"
                    value={driverData.email || 'N/A'}
                />
                <InfoItem
                    // icon={FaPhone}
                    label="Phone ➡️"
                    value={driverData.phoneNumber || 'N/A'}
                />
            </div>
        </div>
    </div>
);

DriverInfo.propTypes = {
    driverData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        phoneNumber: PropTypes.number,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired,
    isDriver: PropTypes.bool
};
const PendingDriverInfo = () => (
    <div className="booking_driver-pending">
        <FaHourglassHalf aria-hidden="true" />
        <h3>Assigning Your Driver</h3>
        <p>
            We are working on finding the perfect driver for your journey. This may take up to 3-4 hours. We will notify you via WhatsApp once a
            driver is assigned.
        </p>
    </div>
);

// Skeleton component for Driver Details
const DriverDetailsSkeleton = () => (
    <section className="booking_booking-detail__driver">
        <Skeleton
            height={28}
            width={160}
        />
        <div className="booking_driver-card">
            <Skeleton
                height={80}
                width={80}
                style={{ borderRadius: '50%' }}
            />
            <div className="booking_driver-card__info">
                <Skeleton
                    height={24}
                    width={150}
                />
                <div className="booking_driver-card__info-items">
                    <div className="info-item">
                        <Skeleton
                            height={16}
                            width={60}
                        />
                        <Skeleton
                            height={16}
                            width={180}
                        />
                    </div>
                    <div className="info-item">
                        <Skeleton
                            height={16}
                            width={60}
                        />
                        <Skeleton
                            height={16}
                            width={120}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export const DriverDetails = ({ orderDetail, isLoading, isDriver = false }) => {
    if (isLoading) {
        return <DriverDetailsSkeleton />;
    }

    if (!orderDetail) {
        return (
            <MessageDisplay
                type="error"
                message="No order data available!"
            />
        );
    }

    const dropOffDate = new Date(orderDetail.dropOffDate);
    const now = new Date();
    const isNotCompleted = dropOffDate < now && (orderDetail.bookingStatus === 'Pending' || orderDetail.bookingStatus === 'Assigning');
    const isCompleted = dropOffDate < now && orderDetail.bookingStatus === 'Completed';
    const isCancelled = orderDetail.bookingStatus === 'Cancelled';
    if (isCancelled) {
        return (
            <MessageDisplay
                type="info"
                message={generic_msg.order_cancelled}
            />
        );
    }
    if (isCompleted) {
        return (
            <MessageDisplay
                type="info"
                message="Your booking is completed successfully"
            />
        );
    }

    if (isNotCompleted) {
        return (
            <MessageDisplay
                type="info"
                message="We are sorry that we are unable to complete your booking. If you have paid the amount, it will be refunded back to you within 2 to 3
                working days. Sorry for the inconvenience."
            />
        );
    }

    const isPending = orderDetail.bookingStatus === 'Pending';
    const driverData = isDriver ? orderDetail.userId : orderDetail.driverId;

    return (
        <section className="booking_booking-detail__driver">
            <h2>Driver Information</h2>
            {isPending || !driverData ? (
                <PendingDriverInfo />
            ) : (
                <DriverInfo
                    driverData={driverData}
                    isDriver={isDriver}
                />
            )}
        </section>
    );
};
DriverDetails.propTypes = {
    orderDetail: PropTypes.shape({
        bookingStatus: PropTypes.string.isRequired,
        dropOffDate: PropTypes.string.isRequired,
        driverId: PropTypes.shape({
            username: PropTypes.string.isRequired,
            email: PropTypes.string,
            phoneNumber: PropTypes.number,
            avatar: PropTypes.shape({
                url: PropTypes.string
            })
        }),
        userId: PropTypes.shape({
            username: PropTypes.string.isRequired,
            email: PropTypes.string,
            phoneNumber: PropTypes.number,
            avatar: PropTypes.shape({
                url: PropTypes.string
            })
        })
    }),
    isLoading: PropTypes.bool.isRequired,
    isDriver: PropTypes.bool
};
const PassengerCard = ({ passenger }) => (
    <div className="booking_passenger-card">
        <div className="booking_passenger-card__avatar">
            {passenger.firstName[0]}
            {passenger.lastName[0]}
        </div>
        <div className="booking_passenger-card__info">
            <h3>
                {passenger.firstName} {passenger.lastName}
            </h3>
            <p>
                {passenger.gender}, {passenger.age || 'N/A'} years old
            </p>
        </div>
    </div>
);
PassengerCard.propTypes = {
    passenger: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        age: PropTypes.number
    }).isRequired
};
// Skeleton component for Passengers Section
const PassengersSectionSkeleton = () => (
    <section className="booking_booking-detail__passengers">
        <Skeleton
            height={28}
            width={140}
        />
        <div className="booking_passengers-list">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="booking_passenger-card">
                    <Skeleton
                        height={60}
                        width={60}
                        style={{ borderRadius: '50%' }}
                    />
                    <div className="booking_passenger-card__info">
                        <Skeleton
                            height={20}
                            width={120}
                        />
                        <Skeleton
                            height={16}
                            width={100}
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export const PassengersSection = ({ passangerInfo, isLoading }) => {
    if (isLoading) {
        return <PassengersSectionSkeleton />;
    }

    if (!passangerInfo?.passengers || passangerInfo.passengers.length === 0) {
        return (
            <MessageDisplay
                type="info"
                message="Passenger Details are not available"
            />
        );
    }

    return (
        <section className="booking_booking-detail__passengers">
            <h2>Passenger Details</h2>
            <div className="booking_passengers-list">
                {passangerInfo.passengers.map((passenger) => (
                    <PassengerCard
                        key={passenger._id}
                        passenger={passenger}
                    />
                ))}
            </div>
        </section>
    );
};
PassengersSection.propTypes = {
    passangerInfo: PropTypes.shape({
        passengers: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                gender: PropTypes.string.isRequired,
                age: PropTypes.number
            })
        )
    }),
    isLoading: PropTypes.bool.isRequired
};
const PaymentInfo = ({ icon: Icon, label, value, style }) => (
    <div
        className="booking_payment-card__amount"
        style={style}>
        <Icon />
        <h3>{label}</h3>
        <p>{value}</p>
    </div>
);
PaymentInfo.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.object
};
// Skeleton component for Payment Section
const PaymentSectionSkeleton = () => (
    <section className="booking_booking-detail__payment">
        <Skeleton
            height={28}
            width={140}
        />
        <div className="booking_payment-card">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="booking_payment-card__amount">
                    <Skeleton
                        height={20}
                        width={20}
                        style={{ borderRadius: '50%' }}
                    />
                    <Skeleton
                        height={20}
                        width={100}
                    />
                    <Skeleton
                        height={16}
                        width={80}
                    />
                </div>
            ))}
        </div>
    </section>
);

export const PaymentSection = ({ paymentInfo, isLoading }) => {
    if (isLoading) {
        return <PaymentSectionSkeleton />;
    }

    if (!paymentInfo) {
        return (
            <MessageDisplay
                type="error"
                message="Payment detials aare missing !"
            />
        );
    }

    return (
        <section className="booking_booking-detail__payment">
            <h2>Payment Details</h2>
            <div className="booking_payment-card">
                <PaymentInfo
                    icon={FaCreditCard}
                    label="Method"
                    value={paymentInfo.paymentMethod}
                />
                <PaymentInfo
                    icon={FaRupeeSign}
                    label="Amount Paid"
                    value={`₹ ${paymentInfo.paidAmount}`}
                    style={{ color: 'green' }}
                />
                <PaymentInfo
                    icon={FaWallet}
                    label="Amount Remaining"
                    value={`₹ ${paymentInfo.bookingAmount - paymentInfo.paidAmount}`}
                    style={{ color: 'red' }}
                />
                <PaymentInfo
                    icon={FaCalculator}
                    label="Total Amount"
                    value={`₹ ${paymentInfo.bookingAmount}`}
                />
                {paymentInfo.paymentMethod !== 'Cash' && (
                    <PaymentInfo
                        icon={FaHashtag}
                        label="Transaction ID"
                        value={paymentInfo.razorpayOrderId || 'N/A'}
                    />
                )}
                <PaymentInfo
                    icon={paymentInfo.paymentStatus !== 'Paid' ? FaExclamationTriangle : FaCheckCircle}
                    label="Payment Status"
                    value={paymentInfo.paymentStatus}
                    style={paymentInfo.paymentStatus !== 'Paid' ? { color: 'red' } : { color: 'green' }}
                />
            </div>
        </section>
    );
};
PaymentSection.propTypes = {
    paymentInfo: PropTypes.shape({
        paymentMethod: PropTypes.string.isRequired,
        paidAmount: PropTypes.number.isRequired,
        bookingAmount: PropTypes.number.isRequired,
        razorpayOrderId: PropTypes.string,
        paymentStatus: PropTypes.string.isRequired
    }),
    isLoading: PropTypes.bool.isRequired
};
