/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import AdminSidebar from '../../../../__components__/adminSidebar';
import { useGetOrderByIdQuery } from '../../../../__redux__/api/order.api';
import { useParams } from 'react-router-dom';
import { useAdminModifyBookingMutation } from '../../../../__redux__/api/admin.api';
import StylishLoader from '../../../../__components__/loader';
import MessageDisplay from '../../../../__components__/messageDisplay';
import { toast } from 'react-toastify';
import { DatePickerDialog, TimePickerDialog } from '../../../../__components__/calender';

const ModifyOrder = () => {
    const { id } = useParams();
    const { data: orderDetail, isLoading, isError, refetch } = useGetOrderByIdQuery(id);
    const [updateOrder, { isLoading: isUpdating }] = useAdminModifyBookingMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedOrder, setEditedOrder] = useState({});
    const [passengers, setPassengers] = useState([]);

    // New state for date/time picker dialogs
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDropOffDatePicker, setShowDropOffDatePicker] = useState(false);
    const [showDropOffTimePicker, setShowDropOffTimePicker] = useState(false);

    // State for storing selected dates and times
    const [departureDate, setDepartureDate] = useState(null);
    const [departureTime, setDepartureTime] = useState('');
    const [dropOffDate, setDropOffDate] = useState(null);
    const [dropOffTime, setDropOffTime] = useState('');

    React.useEffect(() => {
        if (orderDetail) {
            setEditedOrder({
                pickupLocation: orderDetail.pickupLocation || '',
                departureDate: orderDetail.departureDate ? new Date(orderDetail.departureDate).toISOString().slice(0, 16) : '',
                dropOffDate: orderDetail.dropOffDate ? new Date(orderDetail.dropOffDate).toISOString().slice(0, 16) : '',
                exactLocation: orderDetail.exactLocation || '',
                destination: orderDetail.destination || '',
                numberOfPassengers: orderDetail.numberOfPassengers || 1
            });
            setPassengers(orderDetail.passengers || [{ firstName: '', lastName: '', age: '', gender: '' }]);

            // Initialize date/time states from orderDetail
            if (orderDetail.departureDate) {
                const date = new Date(orderDetail.departureDate);
                setDepartureDate(date);
                setDepartureTime(
                    date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                );
            }
            if (orderDetail.dropOffDate) {
                const date = new Date(orderDetail.dropOffDate);
                setDropOffDate(date);
                setDropOffTime(
                    date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                );
            }
        }
    }, [orderDetail]);

    // Helper function to combine date and time for form submission
    const convertToISOString = (date, time) => {
        const targetDate = new Date(date);
        const [timeStr, modifier] = time.split(' ');
        // eslint-disable-next-line prefer-const
        let [hours, minutes] = timeStr.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);
        targetDate.setSeconds(0);
        targetDate.setMilliseconds(0);

        return targetDate.toISOString();
    };

    // Handlers for departure date/time
    const handleDepartureDateClick = () => {
        setShowDatePicker(true);
    };

    const handleDepartureTimeClick = () => {
        setShowTimePicker(true);
    };

    const handleDepartureDateSelect = (selectedDate) => {
        setDepartureDate(selectedDate);
        // Update the editedOrder state for form submission
        const combinedDateTime = convertToISOString(selectedDate, departureTime);
        if (combinedDateTime) {
            setEditedOrder((prev) => ({ ...prev, departureDate: combinedDateTime }));
        }
    };

    const handleDepartureTimeSelect = (selectedTime) => {
        setDepartureTime(selectedTime);
        // Update the editedOrder state for form submission
        if (departureDate) {
            const combinedDateTime = convertToISOString(departureDate, selectedTime);
            setEditedOrder((prev) => ({ ...prev, departureDate: combinedDateTime }));
        }
    };

    // Handlers for drop-off date/time
    const handleDropOffDateClick = () => {
        setShowDropOffDatePicker(true);
    };

    const handleDropOffTimeClick = () => {
        setShowDropOffTimePicker(true);
    };

    const handleDropOffDateSelect = (selectedDate) => {
        setDropOffDate(selectedDate);
        // Update the editedOrder state for form submission
        const combinedDateTime = convertToISOString(selectedDate, dropOffTime);
        if (combinedDateTime) {
            setEditedOrder((prev) => ({ ...prev, dropOffDate: combinedDateTime }));
        }
    };

    const handleDropOffTimeSelect = (selectedTime) => {
        setDropOffTime(selectedTime);
        // Update the editedOrder state for form submission
        if (dropOffDate) {
            const combinedDateTime = convertToISOString(dropOffDate, selectedTime);
            setEditedOrder((prev) => ({ ...prev, dropOffDate: combinedDateTime }));
        }
    };

    const handleEdit = () => setIsEditing(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedOrder((prev) => ({ ...prev, [name]: value }));
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
        setPassengers(updatedPassengers);
    };

    const addPassenger = () => {
        const maxCapacity = orderDetail?.bookedCab?.capacity || 10;
        if (passengers.length < maxCapacity) {
            setPassengers([...passengers, { firstName: '', lastName: '', age: '', gender: '' }]);
            setEditedOrder((prev) => ({ ...prev, numberOfPassengers: passengers.length + 1 }));
        } else {
            toast.error(`Cannot add more passengers. Cab capacity is ${maxCapacity}.`);
        }
    };

    const removePassenger = (index) => {
        if (passengers.length > 1) {
            const updatedPassengers = passengers.filter((_, i) => i !== index);
            setPassengers(updatedPassengers);
            setEditedOrder((prev) => ({ ...prev, numberOfPassengers: updatedPassengers.length }));
        }
    };

    const validateForm = () => {
        // Basic validation
        if (!editedOrder.pickupLocation.trim()) {
            toast.error('Pickup location is required');
            return false;
        }
        if (!editedOrder.destination.trim()) {
            toast.error('Destination is required');
            return false;
        }
        if (!editedOrder.departureDate) {
            toast.error('Departure date and time are required');
            return false;
        }
        if (orderDetail?.bookingType === 'RoundTrip' && !editedOrder.dropOffDate) {
            toast.error('Drop-off date and time are required for round trip');
            return false;
        }

        // Date validation
        const departureDate = new Date(editedOrder.departureDate);
        const dropOffDate = editedOrder.dropOffDate ? new Date(editedOrder.dropOffDate) : null;

        if (dropOffDate && dropOffDate <= departureDate) {
            toast.error('Drop-off date must be after departure date');
            return false;
        }

        // Passenger validation
        const hasEmptyPassengers = passengers.some((p) => !p.firstName.trim() || !p.lastName.trim());
        if (hasEmptyPassengers) {
            toast.error('All passengers must have first name and last name');
            return false;
        }

        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const updateData = {
                ...editedOrder,
                passengers,
                numberOfPassengers: passengers.length
            };

            const resultAction = await updateOrder({
                id,
                newData: updateData
            }).unwrap();
            await refetch();
            const { message } = resultAction;
            toast.success(message);
            setIsEditing(false);
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to update order');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (orderDetail) {
            setEditedOrder({
                pickupLocation: orderDetail.pickupLocation || '',
                departureDate: orderDetail.departureDate ? new Date(orderDetail.departureDate).toISOString().slice(0, 16) : '',
                dropOffDate: orderDetail.dropOffDate ? new Date(orderDetail.dropOffDate).toISOString().slice(0, 16) : '',
                exactLocation: orderDetail.exactLocation || '',
                destination: orderDetail.destination || '',
                numberOfPassengers: orderDetail.numberOfPassengers || 1
            });
            setPassengers(orderDetail.passengers || [{ firstName: '', lastName: '', age: '', gender: '' }]);

            // Reset date/time states
            if (orderDetail.departureDate) {
                const date = new Date(orderDetail.departureDate);
                setDepartureDate(date);
                setDepartureTime(
                    date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                );
            } else {
                setDepartureDate(null);
                setDepartureTime('');
            }
            if (orderDetail.dropOffDate) {
                const date = new Date(orderDetail.dropOffDate);
                setDropOffDate(date);
                setDropOffTime(
                    date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                );
            } else {
                setDropOffDate(null);
                setDropOffTime('');
            }
        }
    };

    // Sync passengers with numberOfPassengers input
    const handlePassengerCountChange = (e) => {
        const count = parseInt(e.target.value) || 1;
        const maxCapacity = orderDetail?.bookedCab?.capacity || 10;

        if (count > maxCapacity) {
            toast.error(`Cannot exceed cab capacity of ${maxCapacity}`);
            return;
        }

        setEditedOrder((prev) => ({ ...prev, numberOfPassengers: count }));

        // Adjust passengers array
        if (count > passengers.length) {
            // Add new passengers
            const newPassengers = [...passengers];
            for (let i = passengers.length; i < count; i++) {
                newPassengers.push({ firstName: '', lastName: '', age: '', gender: '' });
            }
            setPassengers(newPassengers);
        } else if (count < passengers.length) {
            // Remove excess passengers
            setPassengers(passengers.slice(0, count));
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
                        message="Failed to load order details. Please try again later."
                    />
                ) : (
                    <div className="modify_order_container">
                        <header className="modify_order_header">
                            <h1>Modify Order</h1>
                            <div className="modify_order_id">
                                <span>Order ID: {orderDetail?._id}</span>
                            </div>
                        </header>

                        <main className="modify_order_content">
                            <section className="modify_order_info">
                                <div className="modify_order_actions">
                                    <h2>Order Information</h2>
                                    {!isUpdating ? (
                                        <div className="modify_order_action_buttons">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={handleUpdate}
                                                        disabled={isUpdating}
                                                        className="modify_order_btn save_btn">
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="modify_order_btn cancel_btn">
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={handleEdit}
                                                    className="modify_order_btn edit_btn">
                                                    Edit Order
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <button className="modify_order_btn processing_btn">Processing...</button>
                                    )}
                                </div>

                                {/* Order Basic Details */}
                                <div className="modify_order_basic_info">
                                    <h3>Basic Information</h3>

                                    <div className="modify_order_info_grid">
                                        <div className="modify_order_info_item">
                                            <label>Created At</label>
                                            <p>{new Date(orderDetail?.createdAt).toLocaleString()}</p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Booking Status</label>
                                            <p className={`status-badge status-${orderDetail?.bookingStatus?.toLowerCase()}`}>
                                                {orderDetail?.bookingStatus}
                                            </p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Booking Type</label>
                                            <p>{orderDetail?.bookingType}</p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Departure Date & Time</label>
                                            {isEditing ? (
                                                <div className="modify_order_datetime_container">
                                                    <button
                                                        type="button"
                                                        onClick={handleDepartureDateClick}
                                                        className="modify_order_datetime_btn">
                                                        📅 {departureDate ? departureDate.toLocaleDateString() : 'Select Date'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleDepartureTimeClick}
                                                        className="modify_order_datetime_btn">
                                                        🕒 {departureTime || 'Select Time'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <p>{new Date(orderDetail?.departureDate).toLocaleString()}</p>
                                            )}
                                        </div>

                                        {(orderDetail?.bookingType === 'RoundTrip' || isEditing) && (
                                            <div className="modify_order_info_item">
                                                <label>Drop Off Date & Time</label>
                                                {isEditing ? (
                                                    <div className="modify_order_datetime_container">
                                                        <button
                                                            type="button"
                                                            onClick={handleDropOffDateClick}
                                                            className="modify_order_datetime_btn">
                                                            📅 {dropOffDate ? dropOffDate.toLocaleDateString() : 'Select Date'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleDropOffTimeClick}
                                                            className="modify_order_datetime_btn">
                                                            🕒 {dropOffTime || 'Select Time'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p>
                                                        {orderDetail?.dropOffDate
                                                            ? new Date(orderDetail.dropOffDate).toLocaleString()
                                                            : 'Not specified'}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Trip Details Section */}
                                <div className="modify_order_trip_section">
                                    <h3>Trip Details</h3>

                                    <div className="modify_order_info_grid">
                                        <div className="modify_order_info_item">
                                            <label>Pickup Location</label>
                                            {isEditing ? (
                                                <input
                                                    name="pickupLocation"
                                                    value={editedOrder.pickupLocation}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter pickup location"
                                                    className="modify_order_input"
                                                    required
                                                />
                                            ) : (
                                                <p>{orderDetail?.pickupLocation}</p>
                                            )}
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Exact Location</label>
                                            {isEditing ? (
                                                <textarea
                                                    name="exactLocation"
                                                    value={editedOrder.exactLocation}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter exact pickup location (building, landmark, etc.)"
                                                    className="modify_order_input modify_order_textarea"
                                                    rows="3"
                                                />
                                            ) : (
                                                <p>{orderDetail?.exactLocation || 'Not specified'}</p>
                                            )}
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Destination</label>
                                            {isEditing ? (
                                                <input
                                                    name="destination"
                                                    value={editedOrder.destination}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter destination"
                                                    className="modify_order_input"
                                                    required
                                                />
                                            ) : (
                                                <p>{orderDetail?.destination}</p>
                                            )}
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Number of Passengers</label>
                                            <div className="modify_order_passenger_count">
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        name="numberOfPassengers"
                                                        value={editedOrder.numberOfPassengers}
                                                        onChange={handlePassengerCountChange}
                                                        min="1"
                                                        max={orderDetail?.bookedCab?.capacity || 10}
                                                        className="modify_order_input"
                                                    />
                                                ) : (
                                                    <p>{orderDetail?.numberOfPassengers}</p>
                                                )}
                                                <span className="modify_order_capacity_info">(Max: {orderDetail?.bookedCab?.capacity || 'N/A'})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Passenger Details Section */}
                                <div className="modify_order_passengers_section">
                                    <div className="modify_order_passengers_header">
                                        <h3>Passenger Details</h3>
                                        {isEditing && (
                                            <div className="modify_order_passenger_actions">
                                                <button
                                                    type="button"
                                                    onClick={addPassenger}
                                                    className="modify_order_add_passenger_btn"
                                                    disabled={passengers.length >= (orderDetail?.bookedCab?.capacity || 10)}>
                                                    Add Passenger
                                                </button>
                                                <span className="modify_order_passenger_counter">
                                                    {passengers.length} / {orderDetail?.bookedCab?.capacity || 'N/A'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="modify_order_passengers_list">
                                        {passengers.map((passenger, index) => (
                                            <div
                                                key={index}
                                                className="modify_order_passenger_card">
                                                <div className="modify_order_passenger_card_header">
                                                    <h4>Passenger {index + 1}</h4>
                                                    {isEditing && passengers.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removePassenger(index)}
                                                            className="modify_order_remove_passenger_btn">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="modify_order_passenger_details">
                                                    <div className="modify_order_passenger_field">
                                                        <label>First Name *</label>
                                                        {isEditing ? (
                                                            <input
                                                                value={passenger.firstName}
                                                                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                                                                placeholder="First name"
                                                                className="modify_order_input"
                                                                required
                                                            />
                                                        ) : (
                                                            <p>{passenger.firstName}</p>
                                                        )}
                                                    </div>

                                                    <div className="modify_order_passenger_field">
                                                        <label>Last Name *</label>
                                                        {isEditing ? (
                                                            <input
                                                                value={passenger.lastName}
                                                                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                                                                placeholder="Last name"
                                                                className="modify_order_input"
                                                                required
                                                            />
                                                        ) : (
                                                            <p>{passenger.lastName}</p>
                                                        )}
                                                    </div>

                                                    <div className="modify_order_passenger_field">
                                                        <label>Age</label>
                                                        {isEditing ? (
                                                            <input
                                                                type="number"
                                                                value={passenger.age}
                                                                onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value) || '')}
                                                                placeholder="Age"
                                                                min="0"
                                                                max="120"
                                                                className="modify_order_input"
                                                            />
                                                        ) : (
                                                            <p>{passenger.age || 'Not specified'}</p>
                                                        )}
                                                    </div>

                                                    <div className="modify_order_passenger_field">
                                                        <label>Gender</label>
                                                        {isEditing ? (
                                                            <select
                                                                value={passenger.gender}
                                                                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                                                className="modify_order_select">
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        ) : (
                                                            <p>{passenger.gender || 'Not specified'}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cab Information Section */}
                                <div className="modify_order_cab_section">
                                    <h3>Assigned Cab Information</h3>

                                    <div className="modify_order_info_grid">
                                        <div className="modify_order_info_item">
                                            <label>Cab Model</label>
                                            <p>{orderDetail?.bookedCab?.modelName || 'Not assigned'}</p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Cab Number</label>
                                            <p>{orderDetail?.bookedCab?.cabNumber || 'Not assigned'}</p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Cab Capacity</label>
                                            <p>{orderDetail?.bookedCab?.capacity || 'Not assigned'}</p>
                                        </div>

                                        <div className="modify_order_info_item">
                                            <label>Features</label>
                                            <p>{orderDetail?.bookedCab?.feature || 'Not specified'}</p>
                                        </div>

                                        {orderDetail?.bookedCab?.rate && (
                                            <div className="modify_order_info_item">
                                                <label>Rate per Day</label>
                                                <p>₹{orderDetail.bookedCab.rate}</p>
                                            </div>
                                        )}

                                        <div className="modify_order_info_item">
                                            <label>Availability</label>
                                            <p className={`status-badge status-${orderDetail?.bookedCab?.availability?.toLowerCase()}`}>
                                                {orderDetail?.bookedCab?.availability || 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                {(orderDetail?.bookingAmount || orderDetail?.paidAmount) && (
                                    <div className="modify_order_payment_section">
                                        <h3>Payment Information</h3>

                                        <div className="modify_order_info_grid">
                                            {orderDetail?.bookingAmount && (
                                                <div className="modify_order_info_item">
                                                    <label>Booking Amount</label>
                                                    <p>₹{orderDetail.bookingAmount}</p>
                                                </div>
                                            )}

                                            {orderDetail?.paidAmount && (
                                                <div className="modify_order_info_item">
                                                    <label>Paid Amount</label>
                                                    <p>₹{orderDetail.paidAmount}</p>
                                                </div>
                                            )}

                                            <div className="modify_order_info_item">
                                                <label>Payment Method</label>
                                                <p>{orderDetail?.paymentMethod || 'Not specified'}</p>
                                            </div>

                                            <div className="modify_order_info_item">
                                                <label>Payment Status</label>
                                                <p className={`status-badge status-${orderDetail?.paymentStatus?.toLowerCase()}`}>
                                                    {orderDetail?.paymentStatus || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </main>

                        {/* Date Picker Dialogs */}
                        <DatePickerDialog
                            isOpen={showDatePicker}
                            onClose={() => setShowDatePicker(false)}
                            onSelect={handleDepartureDateSelect}
                            selectedDate={departureDate}
                            minDate={new Date()}
                        />

                        <TimePickerDialog
                            isOpen={showTimePicker}
                            onClose={() => setShowTimePicker(false)}
                            onSelect={handleDepartureTimeSelect}
                            selectedTime={departureTime}
                        />

                        <DatePickerDialog
                            isOpen={showDropOffDatePicker}
                            onClose={() => setShowDropOffDatePicker(false)}
                            onSelect={handleDropOffDateSelect}
                            selectedDate={dropOffDate}
                            minDate={departureDate || new Date()}
                        />

                        <TimePickerDialog
                            isOpen={showDropOffTimePicker}
                            onClose={() => setShowDropOffTimePicker(false)}
                            onSelect={handleDropOffTimeSelect}
                            selectedTime={dropOffTime}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default ModifyOrder;
