// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import { useParams } from 'react-router-dom';
import { useCabDetailQuery } from '../../../__redux__/api/cab.api';
import StylishLoader from '../../../__components__/loader';

const CabDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useCabDetailQuery(id);

    const loading = isLoading || !data;

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
                        <h1>Cab Details</h1>
                        {isError ? (
                            <div>Error loading cab details</div>
                        ) : (
                            <div className="details__content">
                                <img
                                    src={data.photos && data.photos.length > 0 ? data.photos[0].url : 'https://via.placeholder.com/150?text=No+Image'}
                                    alt={data.modelName || 'Cab'}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                                <h2>{data.modelName}</h2>
                                <p>Cab Number: {data.cabNumber}</p>
                                <p>Belongs To: {data.belongsTo.username}</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default CabDetails;
