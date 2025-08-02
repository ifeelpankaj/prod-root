import React from 'react';
import { useSelector } from 'react-redux';
import { useDocumentVerificationMutation } from '../../__redux__/api/driver.api';
import { toast } from 'react-toastify';
import { generic_msg } from '../../__constants__/res.message';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Verification = ({ onSubmitSuccess }) => {
    const { user } = useSelector((state) => state.auth);
    const [docVerification, { isLoading }] = useDocumentVerificationMutation();

    const [documents, setDocuments] = React.useState({
        aadharCard: null,
        panCard: null,
        drivingLicense: null,
        insurance: null,
        puc: null
    });

    const [bankDetails, setBankDetails] = React.useState({
        accNo: '',
        ifsc: '',
        bankName: ''
    });

    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const [showDocument, setShowDocument] = React.useState(null);

    const handleFileChange = (event, docType) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/')) && file.size <= 2 * 1024 * 1024) {
            setDocuments({ ...documents, [docType]: file });
        } else {
            toast.error(generic_msg.invalid_document);
        }
    };

    const handleBankDetailsChange = (event) => {
        const { name, value } = event.target;
        setBankDetails({ ...bankDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // Append documents
        Object.entries(documents).forEach(([docType, file]) => {
            if (file) {
                formData.append('document', file);
                const formattedDocName = `${user.username}_${docType.charAt(0).toUpperCase() + docType.slice(1)}`;
                formData.append('docName[]', formattedDocName);
            }
        });

        // added bank details
        formData.append('bankDetails[accNo]', bankDetails.accNo);
        formData.append('bankDetails[ifsc]', bankDetails.ifsc);
        formData.append('bankDetails[bankName]', bankDetails.bankName);
        formData.append('bankDetails[accountHolderName]', bankDetails.accountHolderName);

        try {
            const result = await docVerification(formData).unwrap();
            toast.success(result.message || 'Document verification successful');
            onSubmitSuccess();
        } catch (error) {
            toast.error(error.data?.message || 'An error occurred during document verification');
        }
    };
    const toggleShowDocument = (docType) => {
        setShowDocument(showDocument === docType ? null : docType);
    };

    const renderFilePreview = (file, docType) => {
        if (file.type === 'application/pdf') {
            if (isMobile) {
                return (
                    <div className="pdf-preview">
                        <p>PDF file: {file.name}</p>
                        <a
                            href={URL.createObjectURL(file)}
                            download={file.name}
                            className="download-btn">
                            Download PDF
                        </a>
                    </div>
                );
            } else {
                return (
                    <embed
                        src={URL.createObjectURL(file)}
                        type="application/pdf"
                        width="100%"
                        height="400px"
                    />
                );
            }
        } else if (file.type.startsWith('image/')) {
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt={`${docType} preview`}
                />
            );
        } else {
            return <p>Unsupported file type</p>;
        }
    };

    return (
        <motion.div
            className="driver_document-verification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit}>
                {Object.entries(documents).map(([docType, file]) => (
                    <div
                        key={docType}
                        className="driver_document-item">
                        <label htmlFor={docType}>{docType.charAt(0).toUpperCase() + docType.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
                        <div className="driver_file-input-wrapper">
                            <input
                                type="file"
                                id={docType}
                                onChange={(e) => handleFileChange(e, docType)}
                                accept=".pdf,image/*"
                                required
                            />
                            {file && (
                                <button
                                    type="button"
                                    className="driver_show-document-btn"
                                    onClick={() => toggleShowDocument(docType)}>
                                    {showDocument === docType ? 'Hide' : 'Show'}
                                </button>
                            )}
                        </div>
                        <AnimatePresence>
                            {showDocument === docType && (
                                <motion.div
                                    className="driver_document-preview"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}>
                                    {renderFilePreview(file, docType)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                <div className="driver_bank-details-section">
                    <h3>Bank Details</h3>
                    <div className="driver_bank-detail-item">
                        <label htmlFor="accountHolderName">Account Holder Name:</label>
                        <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            value={bankDetails.accountHolderName}
                            onChange={handleBankDetailsChange}
                            required
                        />
                    </div>
                    <div className="driver_bank-detail-item">
                        <label htmlFor="accNo">Account Number:</label>
                        <input
                            type="text"
                            id="accNo"
                            name="accNo"
                            value={bankDetails.accNo}
                            onChange={handleBankDetailsChange}
                            required
                        />
                    </div>
                    <div className="driver_bank-detail-item">
                        <label htmlFor="ifsc">IFSC Code:</label>
                        <input
                            type="text"
                            id="ifsc"
                            name="ifsc"
                            value={bankDetails.ifsc}
                            onChange={handleBankDetailsChange}
                            required
                        />
                    </div>
                    <div className="driver_bank-detail-item">
                        <label htmlFor="bankName">Bank Name:</label>
                        <input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={bankDetails.bankName}
                            onChange={handleBankDetailsChange}
                            required
                        />
                    </div>
                </div>

                <p className="driver_file-requirements">Allowed file types: PDF and images. Maximum file size: 2MB</p>
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {isLoading ? 'Submitting...' : 'Submit Documents'}
                </motion.button>
            </form>
        </motion.div>
    );
};
Verification.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired
};

export default Verification;
