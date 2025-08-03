import React, { useRef, useState } from 'react';
import { FaCalendarAlt, FaCarAlt, FaClock, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { DatePickerDialog, TimePickerDialog } from '../../__components__/calender';
import heroBg from '../../__assets__/hero.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isGoogleMapsLoaded, loadGoogleMaps } from '../../__scripts__/map.script';
import { updateFormField } from '../../__redux__/slice/info.slice';

const PassengerHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tripType, setTripType] = useState('OneWay');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        pickupDate: null,
        pickupTime: '',
        dropOffDate: null,
        dropOffTime: ''
    });

    const [dialogState, setDialogState] = useState({
        showDatePicker: false,
        showTimePicker: false,
        currentField: null
    });

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    // Refs for autocomplete instances
    const fromAutocompleteRef = useRef(null);
    const toAutocompleteRef = useRef(null);

    // Improved Google Maps autocomplete initialization
    React.useEffect(() => {
        let isMounted = true;

        const handlePlaceSelect = (autocomplete, field) => {
            const place = autocomplete.getPlace();
            if (place.formatted_address && isMounted) {
                setFormData((prev) => ({
                    ...prev,
                    [field]: place.formatted_address
                }));
            }
        };

        const initAutocomplete = async () => {
            try {
                // Ensure Google Maps is loaded
                if (!isGoogleMapsLoaded()) {
                    await loadGoogleMaps();
                }

                // Check if component is still mounted and refs are available
                if (!isMounted || !fromInputRef.current || !toInputRef.current) {
                    return;
                }

                // Create autocomplete instances with optimized options
                fromAutocompleteRef.current = new window.google.maps.places.Autocomplete(fromInputRef.current, {
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['establishment', 'geocode'],
                    componentRestrictions: { country: 'in' } // Restrict to India if needed
                });

                toAutocompleteRef.current = new window.google.maps.places.Autocomplete(toInputRef.current, {
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['establishment', 'geocode'],
                    componentRestrictions: { country: 'in' }
                });

                // Add event listeners
                fromAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(fromAutocompleteRef.current, 'from'));

                toAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(toAutocompleteRef.current, 'to'));
            } catch (error) {
                toast.error('Error initializing Google Maps autocomplete:', error);
                // Optionally show user-friendly error message
            }
        };

        initAutocomplete();

        // Cleanup function
        return () => {
            isMounted = false;

            // Clear autocomplete instances and event listeners
            if (fromAutocompleteRef.current && window.google?.maps?.event) {
                window.google.maps.event.clearInstanceListeners(fromAutocompleteRef.current);
                fromAutocompleteRef.current = null;
            }

            if (toAutocompleteRef.current && window.google?.maps?.event) {
                window.google.maps.event.clearInstanceListeners(toAutocompleteRef.current);
                toAutocompleteRef.current = null;
            }
        };
    }, []);

    const handleToggleClick = (type) => {
        setTripType(type === 'oneway' ? 'OneWay' : 'RoundTrip');
        if (type === 'oneway') {
            setFormData((prev) => ({
                ...prev,
                dropOffDate: null,
                dropOffTime: ''
            }));
        }
    };

    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const openDatePicker = (field) => {
        setDialogState({
            showDatePicker: true,
            showTimePicker: false,
            currentField: field
        });
    };

    const openTimePicker = (field) => {
        setDialogState({
            showDatePicker: false,
            showTimePicker: true,
            currentField: field
        });
    };

    const closeDialogs = () => {
        setDialogState({
            showDatePicker: false,
            showTimePicker: false,
            currentField: null
        });
    };

    const handleDateSelect = (date) => {
        const field = dialogState.currentField === 'pickupDate' ? 'pickupDate' : 'dropOffDate';
        setFormData((prev) => ({
            ...prev,
            [field]: date
        }));
    };

    const handleTimeSelect = (time) => {
        const field = dialogState.currentField === 'pickupDate' ? 'pickupTime' : 'dropOffTime';
        setFormData((prev) => ({
            ...prev,
            [field]: time
        }));
    };

    const formatDisplayDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Function to convert date and time to ISO string
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (formData.from === '' || formData.to === '' || formData.pickupDate === null || formData.pickupTime === '') {
            setIsLoading(false);
            return toast.info('Fill the form completely');
        }

        // Additional validation for round trip
        if (tripType === 'RoundTrip' && (formData.dropOffDate === null || formData.dropOffTime === '')) {
            setIsLoading(false);
            return toast.info('Please fill drop-off date and time for round trip');
        }

        try {
            // Convert pickup date and time to ISO string
            const pickupISOString = convertToISOString(formData.pickupDate, formData.pickupTime);

            // Convert dropoff date and time to ISO string if round trip
            let dropOffISOString = null;
            if (tripType === 'RoundTrip') {
                dropOffISOString = convertToISOString(formData.dropOffDate, formData.dropOffTime);
            }

            // Store data in Redux store one by one with promise handling
            const dispatchPromises = [
                dispatch(updateFormField({ field: 'from', value: formData.from })),
                dispatch(updateFormField({ field: 'to', value: formData.to })),
                dispatch(updateFormField({ field: 'pickupDate', value: pickupISOString })),
                dispatch(updateFormField({ field: 'cabType', value: tripType }))
            ];

            // Add round trip data if applicable
            if (tripType === 'RoundTrip') {
                dispatchPromises.push(dispatch(updateFormField({ field: 'dropOffDate', value: dropOffISOString })));
            }

            // Wait for all dispatches to complete
            await Promise.all(dispatchPromises);

            // Navigate after successful dispatch
            setTimeout(() => {
                setIsLoading(false);
                navigate('/display-cabs');
            }, 800);
        } catch (error) {
            setIsLoading(false);
            toast.error(`Failed to save form data. ${error.message}`);
        }
    };

    return (
        <div
            className="p_home_container"
            style={{ backgroundImage: `url(${heroBg})` }}>
            <div>
                <div className="p_home_booking-card">
                    <h1 className="p_home_brand-title">Velocity Rides</h1>

                    <div className="p_home_trip-toggle">
                        <button
                            className={`p_home_toggle-option ${tripType === 'OneWay' ? 'p_home_active' : ''}`}
                            type="button"
                            onClick={() => handleToggleClick('oneway')}>
                            One Way
                        </button>
                        <button
                            className={`p_home_toggle-option ${tripType === 'RoundTrip' ? 'p_home_active' : ''}`}
                            type="button"
                            onClick={() => handleToggleClick('roundtrip')}>
                            Round Trip
                        </button>
                    </div>

                    {/* Booking Form */}
                    <div className="p_home_booking-form">
                        {/* From Location */}
                        <div className="p_home_form-group">
                            <div className="p_home_input-wrapper">
                                <FaMapMarkerAlt className="p_home_input-icon" />
                                <input
                                    type="text"
                                    ref={fromInputRef}
                                    className="p_home_form-input"
                                    placeholder="Pick-up Location"
                                    value={formData.from || ''}
                                    onChange={handleInputChange('from')}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* To Location */}
                        <div className="p_home_form-group">
                            <div className="p_home_input-wrapper">
                                <FaRoute className="p_home_input-icon" />
                                <input
                                    type="text"
                                    ref={toInputRef}
                                    className="p_home_form-input"
                                    placeholder="Drop-off Location"
                                    value={formData.to || ''}
                                    onChange={handleInputChange('to')}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* Pickup Date and Time */}
                        <div className="p_home_form-group">
                            <div className="p_home_datetime-row">
                                <div className="p_home_datetime-input">
                                    <div
                                        className="p_home_input-wrapper"
                                        onClick={() => openDatePicker('pickupDate')}>
                                        <FaCalendarAlt className="p_home_input-icon" />
                                        <input
                                            type="text"
                                            className="p_home_form-input"
                                            placeholder="Pick-up Date"
                                            value={formData.pickupDate ? formatDisplayDate(formData.pickupDate) : ''}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="p_home_datetime-input">
                                    <div
                                        className="p_home_input-wrapper"
                                        onClick={() => openTimePicker('pickupDate')}>
                                        <FaClock className="p_home_input-icon" />
                                        <input
                                            type="text"
                                            className="p_home_form-input"
                                            placeholder="Pick-up Time"
                                            value={formData.pickupTime || ''}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Round Trip Drop-off Date and Time */}
                        {tripType === 'RoundTrip' && (
                            <div className="p_home_form-group">
                                <div className="p_home_datetime-row">
                                    <div className="p_home_datetime-input">
                                        <div
                                            className="p_home_input-wrapper"
                                            onClick={() => openDatePicker('dropOffDate')}>
                                            <FaCalendarAlt className="p_home_input-icon" />
                                            <input
                                                type="text"
                                                className="p_home_form-input"
                                                placeholder="Drop-off Date"
                                                value={formData.dropOffDate ? formatDisplayDate(formData.dropOffDate) : ''}
                                                readOnly
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="p_home_datetime-input">
                                        <div
                                            className="p_home_input-wrapper"
                                            onClick={() => openTimePicker('dropOffDate')}>
                                            <FaClock className="p_home_input-icon" />
                                            <input
                                                type="text"
                                                className="p_home_form-input"
                                                placeholder="Drop-off Time"
                                                value={formData.dropOffTime || ''}
                                                readOnly
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="button"
                            className="p_home_search-button"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            {isLoading ? (
                                <div className="p_home_loading-content">
                                    <div className="p_home_loading-spinner" />
                                    Finding Rides...
                                </div>
                            ) : (
                                <div className="p_home_loading-content">
                                    <FaCarAlt className="p_home_search-icon" />
                                    Go for it
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Date Picker Dialog */}
            <DatePickerDialog
                isOpen={dialogState.showDatePicker}
                onClose={closeDialogs}
                onSelect={handleDateSelect}
                selectedDate={dialogState.currentField === 'pickupDate' ? formData.pickupDate : formData.dropOffDate}
                minDate={dialogState.currentField === 'dropOffDate' && formData.pickupDate ? formData.pickupDate : new Date()}
            />

            {/* Time Picker Dialog */}
            <TimePickerDialog
                isOpen={dialogState.showTimePicker}
                onClose={closeDialogs}
                onSelect={handleTimeSelect}
                selectedTime={dialogState.currentField === 'pickupDate' ? formData.pickupTime : formData.dropOffTime}
            />
        </div>
    );
};

export default PassengerHome;
