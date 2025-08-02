// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../../__redux__/api/auth.api';
import AdminSidebar from '../../../__components__/adminSidebar';
import StylishLoader from '../../../__components__/loader';

const UserDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetUserByIdQuery(id);
    const loading = isLoading || !data;

    const formattedDate = data?.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
          })
        : '';
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="cyan"
                    />
                ) : (
                    <section className="details-section">
                        <h1>{data?.username} Details</h1>
                        {isError ? (
                            <div>Error loading User details</div>
                        ) : (
                            <div className="details__content">
                                <img
                                    src={
                                        data?.avatar && data?.avatar.url
                                            ? data?.avatar.url
                                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp'
                                    }
                                    alt={data.username || 'User'}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                                <h2>{data.role}</h2>
                                <p>Cell Number : {data.phoneNumber}</p>
                                <p>Email : {data.email}</p>
                                <p>Member Since : {formattedDate}</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default UserDetails;
