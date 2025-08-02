/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCabDetailsQuery } from '../../__redux__/api/cab.api';
import { useBookCabMutation, usePaymentVerificationMutation } from '../../__redux__/api/order.api';
import StylishLoader from '../../__components__/stylish.loader';
import MessageDisplay from '../../__components__/message.display';
import { generic_msg } from '../../__constants__/res.message';
import Carousel from '../../__components__/carousel';
import { date } from '../../__utils__/date.utils';
import { loadScripts } from '../../__scripts__/map.script';

const PreviewBooking = () => {
    const navigate = useNavigate();
    const bookingData = useSelector((state) => state.info);

    React.useEffect(() => {
        if (!bookingData.from || !bookingData.to) {
            toast.info('It seems you have reloaded the page kindly fill the details again');
            navigate('/');
        }
    }, [bookingData, navigate]);
    const { id } = useParams();

    const { data: cab, isLoading: detailsLoading } = useCabDetailsQuery(id);

    const [paymentMethod, setPaymentMethod] = React.useState('Online');

    const [isProcessing, setIsProcessing] = React.useState(false);

    const [verifyPayment] = usePaymentVerificationMutation();

    const [bookCab] = useBookCabMutation();

    const [exactLocation, setExactLocation] = React.useState('');

    const [passengers, setPassengers] = React.useState([{ firstName: '', lastName: '', gender: '', age: '' }]);

    const addPassenger = () => {
        if (passengers.length < capacity) {
            setPassengers([...passengers, { firstName: '', lastName: '', gender: '', age: '' }]);
        } else {
            toast.warning(`Maximum ${capacity} passengers allowed for this cab`);
        }
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    if (detailsLoading) {
        return (
            <StylishLoader
                size="large"
                color="red"
            />
        );
    }
    if (!cab) {
        return (
            <MessageDisplay
                message={generic_msg.no_cab_found}
                type="error"
            />
        );
    }
    const imageGallery = cab.photos || [];
    const cabInfo = cab || {};
    const TotalAmount = Math.round(cabInfo.rate * bookingData.distance);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!cabInfo._id) {
            toast.error(generic_msg.cab_fetching_fails);
            setIsProcessing(false);
            return;
        }

        const orderDetails = {
            bookingType: bookingData.cabType,
            bookedCab: cabInfo._id,
            exactLocation,
            departureDate: bookingData.pickupDate,
            dropOffDate: bookingData.dropOffDate || bookingData.pickupDate,
            pickupLocation: bookingData.from,
            destination: bookingData.to,
            numberOfPassengers: passengers.length,
            bookingStatus: 'Pending',
            paymentMethod,
            passengers,
            bookingAmount: TotalAmount
        };

        try {
            const { data } = await bookCab(orderDetails);

            if (paymentMethod === 'Online' || paymentMethod === 'Hybrid') {
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_API,
                    amount: data.amountToPay * 100,
                    currency: 'INR',
                    name: 'BariTours&Travel',
                    description: 'Cab Booking Payment',
                    order_id: data.order.razorpayOrderId,
                    handler: async (response) => {
                        try {
                            const verificationResponse = await verifyPayment({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            });
                            if (verificationResponse.data.success) {
                                toast.success(verificationResponse.data.message);
                                navigate('/bookings');
                            }
                        } catch (verificationError) {
                            toast.error(`${generic_msg.verification_fails} ${verificationError.message}`);
                        }
                    },
                    theme: {
                        color: '#F37254'
                    }
                };
                await loadScripts();
                if (!window.Razorpay) {
                    toast.error('Razorpay script not loaded');
                }
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
        } catch (error) {
            toast.error(`${generic_msg.order_placing_failed} ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };
    const { capacity } = cab;
    return (
        <main className="book_review_main">
            <div className="book_summary">
                <h2 className="book_heading">Review Your Booking</h2>
                <p className="book_info">
                    {bookingData.from} - {bookingData.to} | {bookingData.cabType} | {date.formatDate(bookingData.pickupDate, false)}
                </p>
            </div>
            <div className="book_details_container">
                <section className="book_cab_details">
                    <div className="book_cab_image_container">
                        <h1 className="book_section_heading">Your Ride Images</h1>
                        <Carousel images={imageGallery} />
                    </div>
                    <div className="book_driver_info">
                        <h1 className="book_cab_model_name">{cabInfo.modelName}</h1>
                        <h1 className="book_section_heading">About our drivers</h1>
                        <p className="book_section_content">100% of drivers are police verified, licensed, and audited</p>
                    </div>
                    <div className="book_tour_inclusions">
                        <h1 className="book_section_heading">Inclusions & exclusions</h1>
                        <p className="book_section_content">Included in your fare</p>
                    </div>
                    <div className="book_pickup_info">
                        <h1 className="book_section_heading">Enter exact pick up location</h1>
                        <input
                            className="book_pickup_input"
                            type="text"
                            value={exactLocation}
                            onChange={(e) => setExactLocation(e.target.value)}
                            placeholder="Enter your exact pickup location"
                        />
                    </div>
                    <div className="book_passenger_info">
                        <h1 className="book_section_heading">Enter Passenger Details</h1>
                        {passengers.map((passenger, index) => (
                            <div
                                key={index}
                                className="book_passenger_inputs">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={passenger.firstName}
                                    onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={passenger.lastName}
                                    onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                                />
                                <select
                                    value={passenger.gender}
                                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={passenger.age}
                                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addPassenger}
                            className="book_add_passenger_btn"
                            disabled={passengers.length >= capacity}>
                            {passengers.length >= capacity ? `Maximum ${capacity} passengers allowed` : 'Add Another Passenger'}
                        </button>
                    </div>
                    <div className="book_cancellation_policy">
                        <h1 className="book_section_heading">Cancellation Policy</h1>
                        <p className="book_section_content">Enjoy Worry-Free Booking with Free Cancellation!</p>
                    </div>
                    <div className="book_additional_info">
                        <h1 className="book_section_heading">Other Information</h1>
                        <ul className="book_info_list">
                            <li>AC will be switched off in hilly areas</li>
                            <li>Only one pick-up, one drop & one pit stop for meal is included</li>
                        </ul>
                    </div>
                </section>
                <section className="book_payment_details">
                    <div className="book_total_amount">
                        <h1 className="book_section_heading">Total Amount</h1>
                        <h1 className="book_amount_value">₹{TotalAmount}</h1>
                    </div>
                    <div className="book_payment_options">
                        <h1 className="book_section_heading">Payment Options</h1>
                        <div className="book_payment_option">
                            <input
                                type="radio"
                                name="payment"
                                id="hybrid-payment"
                                checked={paymentMethod === 'Hybrid'}
                                onChange={() => setPaymentMethod('Hybrid')}
                            />
                            <label htmlFor="hybrid-payment">Pay Partial Amount : ₹ {Math.round(TotalAmount * 0.1)}</label>
                        </div>
                        <div className="book_payment_option">
                            <input
                                type="radio"
                                name="payment"
                                id="full-payment"
                                checked={paymentMethod === 'Online'}
                                onChange={() => setPaymentMethod('Online')}
                            />
                            <label htmlFor="full-payment">Pay Full Amount : ₹ {TotalAmount}</label>
                        </div>
                    </div>
                    <button
                        onClick={submitHandler}
                        disabled={isProcessing}
                        className="book_payment_button">
                        Place Order
                    </button>
                    <div className="book_contact_info">
                        <p>Contact us: +91 9999999999 | xyz@domain.com</p>
                    </div>
                </section>
            </div>
        </main>
    );
};
export default PreviewBooking;
