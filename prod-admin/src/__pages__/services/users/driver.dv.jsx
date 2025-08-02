import React from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import { useParams } from 'react-router-dom';
import { useDriverVerificationMutation } from '../../../__redux__/api/admin.api';
import MessageDisplay from '../../../__components__/messageDisplay';
import StylishLoader from '../../../__components__/loader';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { formatDate, formatDocumentName } from '../../../__utils__/date.utils';
import { useGetUserByIdQuery } from '../../../__redux__/api/auth.api';

// Driver Personal Information Component
const DriverPersonalInfo = ({ driver, loading }) => {
    if (loading) {
        return (
            <div className="dov_ver_info_section">
                <StylishLoader
                    color="yellow"
                    size="large"
                />
            </div>
        );
    }

    if (!driver) {
        return (
            <div className="dov_ver_info_section">
                <MessageDisplay
                    type="error"
                    message="There is some error in fetching info.."
                />
            </div>
        );
    }

    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Personal Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Name:</label>
                    <span className="dov_ver_value">{driver.username}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Email:</label>
                    <span className="dov_ver_value">{driver.email}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Phone Number:</label>
                    <span className="dov_ver_value">{driver.phoneNumber}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver ID:</label>
                    <span className="dov_ver_value">{driver._id}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Registration Date:</label>
                    <span className="dov_ver_value">{formatDate(driver.createdAt)}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Has Cab:</label>
                    <span className={`dov_ver_value ${driver.haveCab ? 'dov_ver_success' : 'dov_ver_danger'}`}>{driver.haveCab ? 'Yes' : 'No'}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Documents Submitted:</label>
                    <span className={`dov_ver_value ${driver.isDocumentSubmited ? 'dov_ver_success' : 'dov_ver_danger'}`}>
                        {driver.isDocumentSubmited ? 'Yes' : 'No'}
                    </span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Verified Status:</label>
                    <span className={`dov_ver_value ${driver.isVerifiedDriver ? 'dov_ver_success' : 'dov_ver_danger'}`}>
                        {driver.isVerifiedDriver ? 'Verified' : 'Not Verified'}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Cab Information Component
const CabInformation = ({ cab, loading }) => {
    if (loading) {
        return (
            <div className="dov_ver_info_section">
                <StylishLoader
                    color="black"
                    size="large"
                />
            </div>
        );
    }

    if (!cab) {
        return (
            <div className="dov_ver_info_section">
                <h2 className="dov_ver_section_title">Cab Information</h2>
                <MessageDisplay
                    type="info"
                    message="No cab information available for this driver."
                />
            </div>
        );
    }

    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Cab Information</h2>
            <div className="dov_ver_cab_details">
                <div className="dov_ver_info_grid">
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Cab Number:</label>
                        <span className="dov_ver_value">{cab.cabNumber}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Model:</label>
                        <span className="dov_ver_value">{cab.modelName}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Capacity:</label>
                        <span className="dov_ver_value">{cab.capacity} passengers</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Features:</label>
                        <span className="dov_ver_value">{cab.feature}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Rate:</label>
                        <span className="dov_ver_value">₹{cab.rate}/km</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Availability:</label>
                        <span className={`dov_ver_value ${cab.availability === 'Available' ? 'dov_ver_success' : 'dov_ver_warning'}`}>
                            {cab.availability}
                        </span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Ready Status:</label>
                        <span className={`dov_ver_value ${cab.isReady ? 'dov_ver_success' : 'dov_ver_danger'}`}>
                            {cab.isReady ? 'Ready' : 'Not Ready'}
                        </span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Upcoming Bookings:</label>
                        <span className="dov_ver_value">{cab.upcomingBookings?.length || 0}</span>
                    </div>
                </div>

                {/* Cab Photos */}
                {cab.photos && cab.photos.length > 0 && (
                    <div className="dov_ver_cab_photos">
                        <h3 className="dov_ver_subsection_title">Cab Photos</h3>
                        <div className="dov_ver_photos_grid">
                            {cab.photos.map((photo, index) => (
                                <div
                                    key={photo._id}
                                    className="dov_ver_photo_item">
                                    <img
                                        src={photo.url}
                                        alt={`Cab photo ${index + 1}`}
                                        className="dov_ver_cab_photo"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Enhanced Driver Documents Component
const DriverDocuments = ({ documents, showDocument, toggleShowDocument, loading }) => {
    // Helper function to check if URL is a PDF
    const isPDF = (url) => {
        return url && (url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('pdf'));
    };

    // Helper function to check if URL is an image
    const isImage = (url) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        return url && imageExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    // Helper function to get file extension
    const getFileExtension = (url) => {
        if (!url) return '';
        const parts = url.split('.');
        return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
    };

    // Handle document view in new tab
    const handleViewInNewTab = (url) => {
        if (!url) {
            toast.error('Document URL is not available');
            return;
        }

        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            toast.info(`Unable to open document. Please try downloading instead.${error}`);
        }
    };

    // Render document preview based on type
    const renderDocumentPreview = (doc) => {
        const { url, docName } = doc;

        if (!url) {
            return (
                <div className="dov_ver_document_error">
                    <p>Document URL is not available</p>
                </div>
            );
        }

        // For images, show direct image
        if (isImage(url)) {
            return (
                <div className="dov_ver_document_image_container">
                    <img
                        src={url}
                        alt={formatDocumentName(docName)}
                        className="dov_ver_document_image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div
                        className="dov_ver_document_error"
                        style={{ display: 'none' }}>
                        <p>
                            Unable to load image.{' '}
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer">
                                Click here to view
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        // For PDFs, try multiple approaches
        if (isPDF(url)) {
            return (
                <div className="dov_ver_document_pdf_container">
                    {/* Primary PDF viewer using object tag */}
                    <object
                        data={url}
                        type="application/pdf"
                        width="100%"
                        height="600"
                        className="dov_ver_document_object">
                        {/* Fallback: Try iframe */}
                        <iframe
                            src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
                            width="100%"
                            height="600"
                            title={formatDocumentName(docName)}
                            className="dov_ver_document_iframe">
                            {/* Final fallback: Direct link */}
                            <div className="dov_ver_document_fallback">
                                <div className="dov_ver_fallback_content">
                                    <h4>Unable to display PDF</h4>
                                    <p>Your browser does not support PDF viewing.</p>
                                    <div className="dov_ver_fallback_actions">
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="dov_ver_btn dov_ver_btn_view">
                                            Open in New Tab
                                        </a>
                                        <a
                                            href={url}
                                            download
                                            className="dov_ver_btn dov_ver_btn_download">
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </iframe>
                    </object>
                </div>
            );
        }

        // For other file types, show info and actions
        return (
            <div className="dov_ver_document_generic">
                <div className="dov_ver_generic_info">
                    <div className="dov_ver_file_icon">📄</div>
                    <div className="dov_ver_file_details">
                        <h4>{formatDocumentName(docName)}</h4>
                        <p>File Type: {getFileExtension(url).toUpperCase() || 'Unknown'}</p>
                        <p>This file type cannot be previewed directly.</p>
                    </div>
                </div>
                <div className="dov_ver_generic_actions">
                    <button
                        onClick={() => handleViewInNewTab(url, docName)}
                        className="dov_ver_btn dov_ver_btn_view"
                        type="button">
                        Open in New Tab
                    </button>
                    <a
                        href={url}
                        download
                        className="dov_ver_btn dov_ver_btn_download">
                        Download File
                    </a>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="dov_ver_info_section">
                <h2 className="dov_ver_section_title">Driver Documents</h2>
                <StylishLoader
                    color="blue"
                    size="large"
                />
            </div>
        );
    }

    if (!documents || documents.length === 0) {
        return (
            <div className="dov_ver_info_section">
                <h2 className="dov_ver_section_title">Driver Documents</h2>
                <MessageDisplay
                    type="info"
                    message="No documents found for this driver."
                />
            </div>
        );
    }

    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Driver Documents ({documents.length})</h2>
            <div className="dov_ver_documents_list">
                {documents.map((doc) => (
                    <div
                        key={doc._id}
                        className="dov_ver_document_item">
                        <div className="dov_ver_document_header">
                            <div className="dov_ver_document_info">
                                <h3 className="dov_ver_document_title">{formatDocumentName(doc.docName)}</h3>
                                <p className="dov_ver_upload_date">Uploaded: {formatDate(doc.uploadedAt)}</p>
                                <div className="dov_ver_document_meta">
                                    <span className="dov_ver_file_type">
                                        {isPDF(doc.url) ? 'PDF Document' : isImage(doc.url) ? 'Image File' : 'Document File'}
                                    </span>
                                    {doc.url && <span className="dov_ver_file_ext">.{getFileExtension(doc.url)}</span>}
                                </div>
                            </div>
                            <div className="dov_ver_document_actions">
                                <button
                                    className="dov_ver_btn dov_ver_btn_view"
                                    onClick={() => toggleShowDocument(doc._id)}
                                    type="button"
                                    aria-expanded={showDocument === doc._id}
                                    aria-controls={`document-preview-${doc._id}`}>
                                    {showDocument === doc._id ? 'Hide' : 'Preview'} Document
                                </button>
                                <button
                                    className="dov_ver_btn dov_ver_btn_external"
                                    onClick={() => handleViewInNewTab(doc.url, doc.docName)}
                                    type="button"
                                    title="Open in new tab">
                                    Open ↗
                                </button>
                                <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dov_ver_btn dov_ver_btn_download"
                                    download
                                    title="Download document">
                                    Download
                                </a>
                            </div>
                        </div>

                        {showDocument === doc._id && (
                            <div
                                id={`document-preview-${doc._id}`}
                                className="dov_ver_document_preview">
                                <div className="dov_ver_preview_header">
                                    <h4>Document Preview</h4>
                                    <p className="dov_ver_preview_note">
                                        If the document does not load properly, try opening it in a new tab or downloading it.
                                    </p>
                                </div>
                                {renderDocumentPreview(doc)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Documents Summary */}
            <div className="dov_ver_documents_summary">
                <h3 className="dov_ver_summary_title">Documents Summary</h3>
                <div className="dov_ver_summary_grid">
                    <div className="dov_ver_summary_item">
                        <span className="dov_ver_summary_label">Total Documents:</span>
                        <span className="dov_ver_summary_value">{documents.length}</span>
                    </div>
                    <div className="dov_ver_summary_item">
                        <span className="dov_ver_summary_label">PDF Files:</span>
                        <span className="dov_ver_summary_value">{documents.filter((doc) => isPDF(doc.url)).length}</span>
                    </div>
                    <div className="dov_ver_summary_item">
                        <span className="dov_ver_summary_label">Image Files:</span>
                        <span className="dov_ver_summary_value">{documents.filter((doc) => isImage(doc.url)).length}</span>
                    </div>
                    <div className="dov_ver_summary_item">
                        <span className="dov_ver_summary_label">Latest Upload:</span>
                        <span className="dov_ver_summary_value">
                            {documents.length > 0 ? formatDate(Math.max(...documents.map((doc) => new Date(doc.uploadedAt)))) : 'No uploads'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Verification Actions Component
const VerificationActions = ({ driver, handleApprove, handleReject, isVerificationLoading }) => {
    if (!driver) return null;

    return (
        <div className="dov_ver_verification_actions">
            <h2 className="dov_ver_section_title">Verification Actions</h2>
            <div className="dov_ver_actions_grid">
                {driver.isVerifiedDriver ? (
                    <button
                        className="dov_ver_btn dov_ver_btn_reject"
                        onClick={handleReject}
                        type="button"
                        disabled={isVerificationLoading}>
                        {isVerificationLoading ? 'Processing...' : 'Reject Driver'}
                    </button>
                ) : (
                    <button
                        className="dov_ver_btn dov_ver_btn_approve"
                        onClick={handleApprove}
                        type="button"
                        disabled={isVerificationLoading}>
                        {isVerificationLoading ? 'Processing...' : 'Approve Driver'}
                    </button>
                )}

                <div className="dov_ver_current_status">
                    <span className={`dov_ver_status_indicator ${driver.isVerifiedDriver ? 'dov_ver_verified' : 'dov_ver_pending'}`}>
                        Current Status: {driver.isVerifiedDriver ? 'Verified' : 'Pending Verification'}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Main Driver Verification Component
const DriverVerification = () => {
    const { id } = useParams();
    const { data: driverDetail, isLoading: driverLoading, isError: driverError, refetch } = useGetUserByIdQuery(id);

    // Lazy query for driver verification
    const [triggerDriverVerification, { isLoading: isVerificationLoading, isError: verificationError }] = useDriverVerificationMutation();

    const [showDocument, setShowDocument] = React.useState(null);

    const loading = driverLoading || !driverDetail;

    const toggleShowDocument = React.useCallback((docId) => {
        setShowDocument((prev) => (prev === docId ? null : docId));
    }, []);

    const handleApprove = React.useCallback(async () => {
        if (!id) return;

        // console.log(id);
        try {
            const result = await triggerDriverVerification(id);

            // Refetch data to get updated status
            await refetch();

            const message = result.data?.message || 'Driver Verification status chnaged';
            toast.success(message);
        } catch (error) {
            toast.error(`Failed to update verification status. Please try again. ${error.message}`);
        }
    }, [id, triggerDriverVerification, refetch]);

    const handleReject = React.useCallback(async () => {
        if (!id) return;

        try {
            const result = await triggerDriverVerification(id);

            await refetch();

            const message = result.data?.message || 'Driver Verification status chnaged';
            toast.success(message);
        } catch (error) {
            toast.error(`Failed to update verification status. Please try again.  ${error.message}`);
        }
    }, [id, triggerDriverVerification, refetch]);

    if (loading) {
        return (
            <div className="admin-container">
                <AdminSidebar />
                <main>
                    <div className="dov_ver_loading_container">
                        <StylishLoader
                            size="large"
                            color="green"
                        />
                    </div>
                </main>
            </div>
        );
    }

    if (driverError) {
        return (
            <div className="admin-container">
                <AdminSidebar />
                <main className="dov_ver_main">
                    <MessageDisplay
                        type="error"
                        message="Failed to load driver details!"
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="dov_ver_main">
                {}
                <section className="admin_driver_driver-details">
                    <div className="driver-header">
                        <h1 className="dov_ver_main_title">Driver Verification Details</h1>
                        <div className="dov_ver_verification_status">
                            <span className={`dov_ver_status_badge ${driverDetail?.isVerifiedDriver ? 'dov_ver_verified' : 'dov_ver_pending'}`}>
                                {driverDetail?.isVerifiedDriver ? 'Verified' : 'Pending Verification'}
                            </span>
                        </div>
                    </div>

                    {/* Show verification error if any */}
                    {verificationError && (
                        <MessageDisplay
                            type="error"
                            message="Error occurred during verification process. Please try again."
                        />
                    )}

                    {/* Driver Personal Information */}
                    <DriverPersonalInfo
                        driver={driverDetail}
                        loading={driverLoading}
                    />

                    {/* Cab Information */}
                    <CabInformation
                        cab={driverDetail?.cab}
                        loading={driverLoading}
                    />

                    {/* Driver Documents */}
                    <DriverDocuments
                        documents={driverDetail?.driverDocuments}
                        showDocument={showDocument}
                        toggleShowDocument={toggleShowDocument}
                        loading={driverLoading}
                    />

                    {/* Verification Actions */}
                    <VerificationActions
                        driver={driverDetail}
                        handleApprove={handleApprove}
                        handleReject={handleReject}
                        isVerificationLoading={isVerificationLoading}
                    />
                </section>
            </main>
        </div>
    );
};
DriverPersonalInfo.propTypes = {
    driver: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.number,
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        haveCab: PropTypes.bool,
        isDocumentSubmited: PropTypes.bool,
        isVerifiedDriver: PropTypes.bool
    }),
    loading: PropTypes.bool.isRequired
};

CabInformation.propTypes = {
    cab: PropTypes.shape({
        cabNumber: PropTypes.string,
        modelName: PropTypes.string,
        capacity: PropTypes.number,
        feature: PropTypes.string,
        rate: PropTypes.number,
        availability: PropTypes.string,
        isReady: PropTypes.bool,
        upcomingBookings: PropTypes.arrayOf(PropTypes.object),
        photos: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                url: PropTypes.string
            })
        )
    }),
    loading: PropTypes.bool.isRequired
};

DriverDocuments.propTypes = {
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            docName: PropTypes.string,
            uploadedAt: PropTypes.string,
            url: PropTypes.string
        })
    ),
    showDocument: PropTypes.string,
    toggleShowDocument: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

VerificationActions.propTypes = {
    driver: PropTypes.shape({
        isVerifiedDriver: PropTypes.bool
    }),
    handleApprove: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    isVerificationLoading: PropTypes.bool.isRequired
};

export default DriverVerification;
