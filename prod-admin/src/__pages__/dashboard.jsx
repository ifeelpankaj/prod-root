// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TrendingDown, TrendingUp, Search, Bell, LogOut } from 'lucide-react';
import AdminSidebar from '../__components__/adminSidebar';
import StylishLoader from '../__components__/loader';
import PropTypes from 'prop-types';
import { BarChart, DoughnutChart } from '../__components__/chart';
import { logout } from '../__redux__/slice/auth.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLazyLogoutQuery } from '../__redux__/api/auth.api';
import { useStatsQuery } from '../__redux__/api/admin.api';
import { revenueViewer } from '../__utils__/dashboard.utils';

const Dashboard = () => {
    const { data: stats, isLoading, isError } = useStatsQuery();

    const rev = stats?.count?.revenue ? revenueViewer(Math.round(stats.count.revenue)) : '0';
    const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i)); // last 6 months
        return date.toLocaleString('default', { month: 'short' }); // e.g. "May", "Jun"
    });

    const [logoutUser] = useLazyLogoutQuery();
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            const result = await logoutUser();
            if (result.data.success === true) {
                dispatch(logout());
                toast.success(result.data.message);
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error(`Logout failed${error.message}`);
        }
    };

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="admin-container">
                <AdminSidebar />
                <main className="dashboard">
                    <StylishLoader
                        size="large"
                        color="#3498db"
                    />
                </main>
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="admin-container">
                <AdminSidebar />
                <main className="dashboard">
                    <div>Error loading dashboard data</div>
                </main>
            </div>
        );
    }

    // Prepare gender ratio data - handle different user types
    const userRatio = stats.userRatio || {};
    const totalUsers = Object.values(userRatio).reduce((sum, count) => sum + count, 0);
    const genderLabels = Object.keys(userRatio);
    const genderData = Object.values(userRatio);
    const genderColors = ['hsl(340, 82%, 56%)', 'rgba(53, 162, 235, 0.8)', 'hsl(120, 70%, 50%)'];

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="dashboard">
                <div className="bar">
                    <Search />
                    <input
                        type="text"
                        placeholder="Search for data, users, docs"
                    />
                    <Bell />
                    <div className="logout">
                        <LogOut onClick={onLogout} />
                    </div>
                </div>

                <section className="widget-container">
                    <WidgetItem
                        percent={stats?.changePercent?.revenue || 0}
                        amount={true}
                        value={rev}
                        heading="Revenue"
                        color="rgb(0,115,255)"
                    />
                    <WidgetItem
                        percent={stats?.changePercent?.user || 0}
                        value={stats?.count?.users || 0}
                        heading="Users"
                        color="rgb(0 198 202)"
                    />
                    <WidgetItem
                        percent={stats?.changePercent?.order || 0}
                        value={stats?.count?.order || 0}
                        heading="Transactions"
                        color="rgb(255 196 0)"
                    />
                    <WidgetItem
                        percent={stats?.changePercent?.cabs || 0}
                        value={stats?.count?.cabs || 0}
                        heading="Cabs"
                        color="rgb(76 0 255)"
                    />
                </section>

                <section className="graph-container">
                    <div className="revenue-chart">
                        <h2>Revenue & Transaction</h2>
                        <BarChart
                            labels={months}
                            data_1={stats?.chart?.revenue || [0, 0, 0, 0, 0, 0]}
                            data_2={stats?.chart?.order || [0, 0, 0, 0, 0, 0]}
                            title_1="Revenue"
                            title_2="Transaction"
                            bgColor_1="rgb(0, 115, 255)"
                            bgColor_2="rgba(53, 162, 235, 0.8)"
                        />
                    </div>

                    <div className="dashboard-categories">
                        <h2>Inventory</h2>
                        <div>
                            {stats?.typeCount?.length > 0 ? (
                                stats.typeCount.map((item, index) => (
                                    <CategoryItem
                                        key={item.capacity || index}
                                        capacity={item.capacity}
                                        count={item.count}
                                        color={`hsl(${(item.count || 0) * 30}, 70%, 50%)`}
                                    />
                                ))
                            ) : (
                                <div>No inventory data available</div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="transaction-container">
                    <div className="gender-chart">
                        <h2>User Types Ratio</h2>
                        {totalUsers > 0 ? (
                            <DoughnutChart
                                labels={genderLabels}
                                data={genderData}
                                backgroundColor={genderColors.slice(0, genderLabels.length)}
                                cutout={90}
                            />
                        ) : (
                            <div>No user data available</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

// Widget Item
const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
    <article className="widget">
        <div className="widget-info">
            <p>{heading}</p>
            <h4>{amount ? `₹${value}` : value}</h4>
            {percent > 0 ? (
                <span className="green">
                    <TrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
                </span>
            ) : (
                <span className="red">
                    <TrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
                </span>
            )}
        </div>

        <div
            className="widget-circle"
            style={{
                background: `conic-gradient(
          ${color} ${(Math.abs(percent) / 100) * 360}deg,
          rgb(255, 255, 255) 0
        )`
            }}>
            <span style={{ color }}>
                {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
                {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
            </span>
        </div>
    </article>
);

WidgetItem.propTypes = {
    heading: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percent: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    amount: PropTypes.bool
};

// Category Item - Fixed prop names to match usage
const CategoryItem = ({ color, count, capacity }) => {
    // Calculate percentage based on some logic (you might want to adjust this)
    const percentage = Math.min((count / 10) * 100, 100); // Assuming max of 10 for percentage calculation

    return (
        <div className="category-item">
            <h5>Capacity: {capacity}</h5>
            <div>
                <div
                    style={{
                        backgroundColor: color,
                        width: `${percentage}%`
                    }}
                />
            </div>
            <span>Count: {count}</span>
        </div>
    );
};

CategoryItem.propTypes = {
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired
};

export default Dashboard;
