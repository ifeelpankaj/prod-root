import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../__redux__/api/auth.api';
import { logout } from '../__redux__/slice/auth.slice';
import { toast } from 'react-toastify';
import { generic_msg } from '../__constants__/res.message';
import { BarsOutlined, CarFilled, LogoutOutlined } from '@ant-design/icons';
import Logo from '../__assets__/logo.png';
import userImg from '../__assets__/userpic.png';
import { FaUser, FaBookmark } from 'react-icons/fa';
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= 768);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
    const [logoutUser] = useLazyLogoutQuery();
    const dispatch = useDispatch();
    const toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsNavMenuOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest('.header__user-menu')) {
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const onLogout = async () => {
        try {
            // dispatch(resetForm());
            const result = await logoutUser();
            if (result.data.success === true) {
                dispatch(logout());
                navigate('/auth');
                toast.success(result.data.message);
            } else {
                toast.error(generic_msg.logout_failed);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <header className="header">
            <div className="header__container">
                {isMobileView && (
                    <button
                        className="header__mobile-toggle"
                        onClick={toggleNavMenu}>
                        <BarsOutlined />
                    </button>
                )}

                {!isMobileView && (
                    <Link
                        to="/"
                        className="header__logo">
                        <img
                            src={Logo}
                            className="header__logo-icon"
                        />
                        <span className="header__logo-text">SafarCabs</span>
                    </Link>
                )}

                <nav className={`header__nav ${isNavMenuOpen ? 'header__nav--open' : ''}`}>
                    {isMobileView && (
                        <Link
                            to="/"
                            className="header__logo">
                            <img
                                src={Logo}
                                className="header__logo-icon"
                            />
                            <span className="header__logo-text">SafarCabs</span>
                        </Link>
                    )}
                    {['Home', 'Services', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className={`header__nav-link ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) ? 'active' : ''}`}
                            onClick={() => isMobileView && toggleNavMenu()}>
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="header__user">
                    {user?._id ? (
                        <div className="header__user-menu">
                            <button
                                className="header__user-toggle"
                                onClick={toggleUserMenu}>
                                <img
                                    src={user?.avatar?.url ? user?.avatar?.url : userImg}
                                    alt="User"
                                />
                            </button>
                            {isUserMenuOpen && (
                                <div className="header__user-dropdown">
                                    <Link
                                        to="/user-profile"
                                        className="header__user-link">
                                        <FaUser /> Profile
                                    </Link>
                                    {user?.role !== 'Driver' ? (
                                        <Link
                                            to="/bookings"
                                            className="header__user-link">
                                            <FaBookmark /> My Bookings
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                to="/my/bookings"
                                                className="header__user-link">
                                                <FaBookmark /> My Bookings
                                            </Link>
                                            <Link
                                                to="/my/cab"
                                                className="header__user-link">
                                                <CarFilled /> My Cab
                                            </Link>
                                        </>
                                    )}
                                    <button
                                        onClick={onLogout}
                                        className="header__user-link header__logout">
                                        <LogoutOutlined /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="header__auth-button">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
