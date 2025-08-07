import { motion } from 'framer-motion';
import MessageDisplay from '../../__components__/message.display';
import StylishLoader from '../../__components__/stylish.loader';
import { generic_msg } from '../../__constants__/res.message';
import { useMeQuery } from '../../__redux__/api/auth.api';
import Verification from './doc.verification';
import Registration from './cab.registration';
import DriverDashboard from './driver.dashboard';

const DriverHome = () => {
    const { data: me, isLoading, error, refetch } = useMeQuery();

    // Handle loading state
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        );
    }

    // Handle error state
    if (error) {
        return (
            <MessageDisplay
                message="Failed to load user data. Please try again."
                type="error"
            />
        );
    }

    // Handle no user data
    const user = me?.data;
    if (!user) {
        return (
            <MessageDisplay
                message={generic_msg.resource_not_found('User')}
                type="error"
            />
        );
    }

    const handleSubmitSuccess = () => {
        refetch();
    };

    // Determine which component to render based on user state
    const renderContent = () => {
        // Documents not submitted
        if (!user.isDocumentSubmited) {
            return (
                <section className="driver_home_driver_section">
                    <h2>Document Verification</h2>
                    <Verification onSubmitSuccess={handleSubmitSuccess} />
                </section>
            );
        }

        // Documents submitted but no cab registered
        if (user.isDocumentSubmited && !user.haveCab) {
            return (
                <section className="driver_home_driver_section">
                    <h2>Cab Registration</h2>
                    <Registration onSubmitSuccess={handleSubmitSuccess} />
                </section>
            );
        }

        // Documents submitted and cab registered
        if (user.isDocumentSubmited && user.haveCab) {
            return <DriverDashboard />;
        }

        // Fallback for unexpected states
        return (
            <MessageDisplay
                message="Unexpected user state. Please contact support."
                type="warning"
            />
        );
    };

    return (
        <motion.div
            className="driver_home_driver-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <motion.div
                className="driver_home_content-wrapper"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                {renderContent()}
            </motion.div>
        </motion.div>
    );
};

export default DriverHome;
