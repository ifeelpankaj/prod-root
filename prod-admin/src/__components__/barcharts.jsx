// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import AdminSidebar from './adminSidebar';
// import StylishLoader from './loader';
// // import { BarChart } from './chart';

// const Barcharts = () => {
//     // Dummy data simulating chart response
//     const data = {
//         charts: {
//             products: [15, 20, 18, 25, 30, 22],
//             orders: [12, 14, 19, 17, 20, 25, 21, 23, 18, 15, 12, 16],
//             users: [5, 8, 10, 15, 18, 20]
//         }
//     };

//     const isLoading = false;

//     // Fake last 6 and 12 months labels
//     const last6Months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
//     const last12Months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

//     const products = data.charts.products;
//     const orders = data.charts.orders;
//     const users = data.charts.users;

//     return (
//         <div className="admin-container">
//             <AdminSidebar />
//             <main className="chart-container">
//                 <h1>Bar Charts</h1>
//                 {isLoading ? (
//                     <StylishLoader
//                         color="red"
//                         size="large"
//                     />
//                 ) : (
//                     <>
//                         <section>
//                             <BarChart
//                                 data_1={products}
//                                 data_2={users}
//                                 labels={last6Months}
//                                 title_1="Products"
//                                 title_2="Users"
//                                 bgColor_1="hsl(260, 50%, 30%)"
//                                 bgColor_2="hsl(360, 90%, 90%)"
//                             />
//                             <h2>Top Products & Top Customers</h2>
//                         </section>

//                         <section>
//                             <BarChart
//                                 horizontal={true}
//                                 data_1={orders}
//                                 data_2={[]}
//                                 title_1="Orders"
//                                 title_2=""
//                                 bgColor_1="hsl(180, 40%, 50%)"
//                                 bgColor_2=""
//                                 labels={last12Months}
//                             />
//                             <h2>Orders throughout the year</h2>
//                         </section>
//                     </>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Barcharts;
