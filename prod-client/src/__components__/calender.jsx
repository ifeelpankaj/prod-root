/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaCaretSquareLeft, FaCaretSquareRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
export const DatePickerDialog = ({ isOpen, onClose, onSelect, selectedDate, minDate }) => {
    const [currentMonth, setCurrentMonth] = React.useState(selectedDate || new Date());

    if (!isOpen) return null;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const minDateObj = minDate || today;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const navigateMonth = (direction) => {
        setCurrentMonth(new Date(year, month + direction, 1));
    };

    const selectDate = (day) => {
        const selectedDateObj = new Date(year, month, day);
        if (selectedDateObj >= minDateObj) {
            onSelect(selectedDateObj);
            onClose();
        }
    };

    const isDateDisabled = (day) => {
        const dateObj = new Date(year, month, day);
        return dateObj < minDateObj;
    };

    const isSelectedDate = (day) => {
        if (!selectedDate) return false;
        const dateObj = new Date(year, month, day);
        return dateObj.toDateString() === selectedDate.toDateString();
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className="calendar-day empty"></div>
            );
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isDisabled = isDateDisabled(day);
            const isSelected = isSelectedDate(day);
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

            days.push(
                <button
                    key={day}
                    type="button"
                    className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => !isDisabled && selectDate(day)}
                    disabled={isDisabled}>
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div
            className="calender_overlay"
            onClick={onClose}>
            <div
                className="calender_content calender_date-picker"
                onClick={(e) => e.stopPropagation()}>
                <div className="calender_header">
                    <h3 className="calender_title">Select Date</h3>
                    <button
                        type="button"
                        className="calender_close"
                        onClick={onClose}>
                        <IoIosCloseCircleOutline />
                    </button>
                </div>
                <div className="calender_month-nav">
                    <button
                        type="button"
                        className="calender_month-btn"
                        onClick={() => navigateMonth(-1)}>
                        <FaCaretSquareLeft />
                    </button>
                    <span className="calender_month-label">
                        {monthNames[month]} {year}
                    </span>
                    <button
                        type="button"
                        className="calender_month-btn"
                        onClick={() => navigateMonth(1)}>
                        <FaCaretSquareRight />
                    </button>
                </div>
                <div className="calender_weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div
                            key={day}
                            className="calender_weekday">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calender_grid">{renderCalendarDays()}</div>
            </div>
        </div>
    );
};

export const TimePickerDialog = ({ isOpen, onClose, onSelect, selectedTime }) => {
    const [hour, setHour] = useState(selectedTime ? parseInt(selectedTime.split(':')[0]) : 12);
    const [minute, setMinute] = useState(selectedTime ? parseInt(selectedTime.split(':')[1].split(' ')[0]) : 0);
    const [period, setPeriod] = useState(selectedTime ? selectedTime.split(' ')[1] : 'AM');

    if (!isOpen) return null;

    const handleTimeSelect = () => {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        onSelect(formattedTime);
        onClose();
    };

    return (
        <div
            className="calender_overlay"
            onClick={onClose}>
            <div
                className="calender_content time-picker"
                onClick={(e) => e.stopPropagation()}>
                <div className="calender_header">
                    <h3 className="calender_title">Select Time</h3>
                    <button
                        type="button"
                        className="calender_close"
                        onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="time-selector">
                    <div className="calender_time-input-group">
                        <label>Hour</label>
                        <select
                            value={hour}
                            onChange={(e) => setHour(parseInt(e.target.value))}>
                            {[...Array(12)].map((_, i) => (
                                <option
                                    key={i + 1}
                                    value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="calender_time-separator">:</div>
                    <div className="calender_time-input-group">
                        <label>Minute</label>
                        <select
                            value={minute}
                            onChange={(e) => setMinute(parseInt(e.target.value))}>
                            {[...Array(60)].map((_, i) => (
                                <option
                                    key={i}
                                    value={i}>
                                    {i.toString().padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="calender_period-toggle">
                        <button
                            type="button"
                            className={period === 'AM' ? 'active' : ''}
                            onClick={() => setPeriod('AM')}>
                            AM
                        </button>
                        <button
                            type="button"
                            className={period === 'PM' ? 'active' : ''}
                            onClick={() => setPeriod('PM')}>
                            PM
                        </button>
                    </div>
                </div>
                <div className="calender_dialog-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleTimeSelect}>
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

DatePickerDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date)
};

DatePickerDialog.defaultProps = {
    selectedDate: null,
    minDate: null
};
TimePickerDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedTime: PropTypes.string
};

TimePickerDialog.defaultProps = {
    selectedTime: null
};
