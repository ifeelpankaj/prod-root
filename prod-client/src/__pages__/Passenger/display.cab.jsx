import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisplayPassengerCabQuery } from '../../__redux__/api/cab.api';
import { useCalculateDistanceQuery } from '../../__redux__/api/other.api';
import { toast } from 'react-toastify';
import { calculateDropOffDate, extractNumericValue } from '../../__utils__/user.utils';
import { updateFormField } from '../../__redux__/slice/info.slice';
import StylishLoader from '../../__components__/stylish.loader';
import MessageDisplay from '../../__components__/message.display';
import { generic_msg } from '../../__constants__/res.message';
import { motion } from 'framer-motion';
import CabCard from '../../__components__/cards/cab.card';

const DisplayCabs = () => {
    const dispatch = useDispatch();

    const formData = useSelector((state) => state.info);

    const [errorShown, setErrorShown] = React.useState(false);

    const { data: cabs, isLoading: cabsLoading, error } = useDisplayPassengerCabQuery();

    const {
        data: distanceData,
        isLoading: distanceLoading,
        error: distanceError
    } = useCalculateDistanceQuery({ origin: formData.from, destination: formData.to });

    React.useEffect(() => {
        if (distanceError && !errorShown) {
            toast.error('Services are not available in this region');
            setErrorShown(true);
        }
    }, [distanceError, errorShown]);
    React.useEffect(() => {
        if (distanceData && distanceData.distance) {
            if (formData.cabType === 'OneWay') {
                const duration = calculateDropOffDate(formData.pickupDate, distanceData.duration);

                dispatch(updateFormField({ field: 'dropOffDate', value: duration }));
            }

            const distanceInKM = extractNumericValue(distanceData.distance);
            dispatch(updateFormField({ field: 'distance', value: distanceInKM }));
        } else {
            const defaultValue = 0;
            dispatch(updateFormField({ field: 'distance', value: defaultValue }));
        }
    }, [dispatch, distanceData, formData.cabType, formData.pickupDate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    if (cabsLoading) {
        return (
            <StylishLoader
                color="green"
                size="large"
            />
        );
    }
    if (error) {
        return (
            <MessageDisplay
                message={generic_msg.cab_fetching_fails}
                type="error"
            />
        );
    }
    return (
        <main className="cabs_page">
            {!cabs ? (
                <div className="cabs_loader_container">
                    <MessageDisplay
                        message={generic_msg.no_cab_found}
                        type="error"
                    />
                </div>
            ) : (
                <motion.div
                    className="cabs_list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {cabs &&
                        cabs.map((cab) => (
                            <motion.div
                                key={cab._id}
                                variants={containerVariants}>
                                <CabCard
                                    cab={cab}
                                    distance={formData.distance}
                                    isLoading={distanceLoading}
                                />
                            </motion.div>
                        ))}
                </motion.div>
            )}
        </main>
    );
};

export default DisplayCabs;
