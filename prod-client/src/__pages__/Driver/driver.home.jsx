import { motion } from 'framer-motion';
import MessageDisplay from '../../__components__/message.display';
import StylishLoader from '../../__components__/stylish.loader';
import { generic_msg } from '../../__constants__/res.message';
import { useMeQuery } from '../../__redux__/api/auth.api';
import Verification from './doc.verification';
import Registration from './cab.registration';
import DriverDashboard from './driver.dashboard';

const DriverHome = () => {
    const { data: me, isLoading, refetch } = useMeQuery();

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        );
    }

    const handleSubmitSuccess = () => {
        refetch();
    };
    const user = me?.data;

    if (!user) {
        <MessageDisplay
            message={generic_msg.resource_not_found('User')}
            type="error"
        />;
    }
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
                {!user?.isDocumentSubmited && (
                    <section className="driver_home_driver_section">
                        <h2>Document Verification</h2>
                        <Verification onSubmitSuccess={handleSubmitSuccess} />
                    </section>
                )}
                {user?.isDocumentSubmited && !user.haveCab && (
                    <section className="driver_home_driver_section">
                        <h2>Cab Registration</h2>
                        <Registration onSubmitSuccess={handleSubmitSuccess} />
                    </section>
                )}
                {user?.isDocumentSubmited && user.haveCab && <DriverDashboard />}
            </motion.div>
        </motion.div>
    );
};

export default DriverHome;
