import { useEffect, useState } from 'react';
import { FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';

import { RiCoupon3Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Car, LayoutDashboard, NotepadText, Repeat1, SquarePlus, Users } from 'lucide-react';

const AdminSidebar = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1100);

    const resizeHandler = () => {
        setPhoneActive(window.innerWidth < 1100);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <>
            {phoneActive && (
                <button
                    id="hamburger"
                    onClick={() => setShowModal(true)}>
                    <HiMenuAlt4 />
                </button>
            )}

            <aside
                style={
                    phoneActive
                        ? {
                              width: '20rem',
                              height: '100vh',
                              position: 'fixed',
                              top: 0,
                              left: showModal ? '0' : '-20rem',
                              transition: 'all 0.5s'
                          }
                        : {}
                }>
                <h2>SafarCabs.</h2>
                <DivOne location={location} />
                <DivTwo location={location} />
                <DivThree location={location} />

                {phoneActive && (
                    <button
                        id="close-sidebar"
                        onClick={() => setShowModal(false)}>
                        Close
                    </button>
                )}
            </aside>
        </>
    );
};

const DivOne = ({ location }) => (
    <div>
        <h5>Dashboard</h5>
        <ul>
            <Li
                url="/dashboard"
                text="Dashboard"
                Icon={LayoutDashboard}
                location={location}
            />
            <Li
                url="/admin/cabs"
                text="Cabs"
                Icon={Car}
                location={location}
            />
            <Li
                url="/admin/customer"
                text="Users"
                Icon={Users}
                location={location}
            />
            <Li
                url="/admin/orders"
                text="Orders"
                Icon={NotepadText}
                location={location}
            />
            <Li
                url="/admin/transactions"
                text="Transaction"
                Icon={Repeat1}
                location={location}
            />
        </ul>
    </div>
);

const DivTwo = ({ location }) => (
    <div>
        <h5>Quicker</h5>
        <ul>
            <Li
                url="/admin/quicker/add/display-cab"
                text="Add Display Cab"
                Icon={SquarePlus}
                location={location}
            />
            <Li
                url="/admin/chart/pie"
                text="Pie"
                Icon={FaChartPie}
                location={location}
            />
            <Li
                url="/admin/chart/line"
                text="Line"
                Icon={FaChartLine}
                location={location}
            />
        </ul>
    </div>
);

const DivThree = ({ location }) => (
    <div>
        <h5>Apps</h5>
        <ul>
            <Li
                url="/admin/app/stopwatch"
                text="Stopwatch"
                Icon={FaStopwatch}
                location={location}
            />
            <Li
                url="/admin/app/coupon"
                text="Coupon"
                Icon={RiCoupon3Fill}
                location={location}
            />
            <Li
                url="/admin/app/toss"
                text="Toss"
                Icon={FaGamepad}
                location={location}
            />
        </ul>
    </div>
);

const Li = ({ url, text, location, Icon }) => (
    <li
        style={{
            backgroundColor: location.pathname.includes(url) ? 'rgba(0,115,255,0.1)' : 'white'
        }}>
        <Link
            to={url}
            style={{
                color: location.pathname.includes(url) ? 'rgb(0,115,255)' : 'black'
            }}>
            <Icon />
            {text}
        </Link>
    </li>
);

// ✅ PropTypes
Li.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    Icon: PropTypes.elementType.isRequired
};

DivOne.propTypes = {
    location: PropTypes.object.isRequired
};

DivTwo.propTypes = {
    location: PropTypes.object.isRequired
};

DivThree.propTypes = {
    location: PropTypes.object.isRequired
};

export default AdminSidebar;
