import moment from 'moment';

export const calculateDropOffDate = (pickupDate, duration) => {
    // Handle different duration formats
    const durationStr = duration.toLowerCase().trim();

    // Initialize values
    let days = 0;
    let hours = 0;
    let mins = 0;

    // Extract days
    const dayMatch = durationStr.match(/(\d+)\s*days?/);
    if (dayMatch) {
        days = parseInt(dayMatch[1]);
    }

    // Extract hours
    const hourMatch = durationStr.match(/(\d+)\s*hours?/);
    if (hourMatch) {
        hours = parseInt(hourMatch[1]);
    }

    // Extract minutes
    const minMatch = durationStr.match(/(\d+)\s*(?:mins?|minutes?)/);
    if (minMatch) {
        mins = parseInt(minMatch[1]);
    }
    days *= 2;
    hours *= 2;
    mins *= 2;

    hours += Math.floor(mins / 60);
    mins = mins % 60;

    days += Math.floor(hours / 24);
    hours = hours % 24;
    // Add the duration to pickupDate
    const dropOffDate = moment(pickupDate).add(days, 'days').add(hours, 'hours').add(mins, 'minutes');
    return dropOffDate.format('YYYY-MM-DD HH:mm');
};

export const extractNumericValue = (distanceString) => {
    if (typeof distanceString !== 'string') return null;

    // Remove any commas and non-numeric characters except the decimal point
    const cleanedString = distanceString.replace(/,/g, '').replace(/[^0-9.]/g, '');
    const distance = parseFloat(cleanedString);

    if (isNaN(distance)) return 0; // In case the distance parsing fails

    const totaldistance = distance;

    // Return the rounded price
    return Math.round(totaldistance);
};

export const priceCalculator = (distance, rate, totalCharges) => {
    if (typeof distance !== 'number' || typeof rate !== 'number') return 0;

    if (isNaN(distance) || isNaN(rate)) return 0;

    const totalprice = distance * rate;

    // Return the rounded price
    return Math.round(totalprice + totalCharges);
};
