/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import AdminSidebar from '../__components__/adminSidebar';
import { useCabRegistrationMutation } from '../__redux__/api/cab.api';
import { toast } from 'react-toastify';

const AddDisplayCab = () => {
    const [cabData, setCabData] = React.useState({
        modelName: '',
        capacity: '',
        cabNumber: '',
        feature: 'AC',
        frontPhoto: null,
        additionalPhotos: []
    });
    const [cabRegister, { isLoading: cabLoading }] = useCabRegistrationMutation();
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCabData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFrontPhotoChange = (e) => {
        const file = e.target.files[0];
        setCabData((prev) => ({
            ...prev,
            frontPhoto: file
        }));

        if (errors.frontPhoto) {
            setErrors((prev) => ({
                ...prev,
                frontPhoto: ''
            }));
        }
    };

    const handleAdditionalPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        setCabData((prev) => ({
            ...prev,
            additionalPhotos: files
        }));

        if (errors.additionalPhotos) {
            setErrors((prev) => ({
                ...prev,
                additionalPhotos: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!cabData.modelName.trim()) {
            newErrors.modelName = 'Model name is required';
        }

        if (!cabData.capacity) {
            newErrors.capacity = 'Capacity is required';
        }

        if (!cabData.cabNumber.trim()) {
            newErrors.cabNumber = 'Cab number is required';
        }

        if (!cabData.frontPhoto) {
            newErrors.frontPhoto = 'Front photo is required';
        }

        if (cabData.additionalPhotos.length === 0) {
            newErrors.additionalPhotos = 'At least one additional photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setCabData({
            modelName: '',
            capacity: '',
            cabNumber: '',
            feature: 'AC',
            frontPhoto: null,
            additionalPhotos: []
        });
        setErrors({});

        // Reset file inputs
        const frontPhotoInput = document.getElementById('frontPhoto');
        const additionalPhotosInput = document.getElementById('additionalPhotos');
        if (frontPhotoInput) frontPhotoInput.value = '';
        if (additionalPhotosInput) additionalPhotosInput.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();

            // Add text fields
            formData.append('modelName', cabData.modelName);
            formData.append('capacity', cabData.capacity);
            formData.append('cabNumber', cabData.cabNumber);
            formData.append('feature', cabData.feature);

            // Add photos - front photo first, then additional photos
            if (cabData.frontPhoto) {
                formData.append('photos', cabData.frontPhoto);
            }

            cabData.additionalPhotos.forEach((photo) => {
                formData.append('photos', photo);
            });

            const result = await cabRegister(formData).unwrap();

            if (result.success) {
                toast.success(result.message);
                resetForm(); // Reset form only on success
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            // Handle different error scenarios
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.message) {
                toast.error(error.message);
            }
        }
    };

    const handleReset = () => {
        resetForm();
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                <div className="add_display_cab-admin-container">
                    <div className="add_display_cab-container">
                        <h2 className="add_display_cab-title">Add New Cab</h2>

                        <form
                            onSubmit={handleSubmit}
                            className="add_display_cab-form">
                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="modelName"
                                    className="add_display_cab-label">
                                    Model Name *
                                </label>
                                <input
                                    type="text"
                                    id="modelName"
                                    name="modelName"
                                    value={cabData.modelName}
                                    onChange={handleInputChange}
                                    placeholder="Enter cab model name"
                                    required
                                    className="add_display_cab-input"
                                />
                                {errors.modelName && <span className="add_display_cab-error">{errors.modelName}</span>}
                            </div>

                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="capacity"
                                    className="add_display_cab-label">
                                    Capacity *
                                </label>
                                <select
                                    id="capacity"
                                    name="capacity"
                                    value={cabData.capacity}
                                    onChange={handleInputChange}
                                    required
                                    className="add_display_cab-select">
                                    <option value="">Select capacity</option>
                                    <option value="2">2 Seater</option>
                                    <option value="3">3 Seater</option>
                                    <option value="4">4 Seater</option>
                                    <option value="5">5 Seater</option>
                                    <option value="6">6 Seater</option>
                                    <option value="7">7 Seater</option>
                                </select>
                                {errors.capacity && <span className="add_display_cab-error">{errors.capacity}</span>}
                            </div>

                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="cabNumber"
                                    className="add_display_cab-label">
                                    Cab Number *
                                </label>
                                <input
                                    type="text"
                                    id="cabNumber"
                                    name="cabNumber"
                                    value={cabData.cabNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter cab registration number"
                                    required
                                    className="add_display_cab-input"
                                />
                                {errors.cabNumber && <span className="add_display_cab-error">{errors.cabNumber}</span>}
                            </div>

                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="feature"
                                    className="add_display_cab-label">
                                    Feature
                                </label>
                                <select
                                    id="feature"
                                    name="feature"
                                    value={cabData.feature}
                                    onChange={handleInputChange}
                                    className="add_display_cab-select">
                                    <option value="AC">AC</option>
                                    <option value="Non-AC">Non-AC</option>
                                </select>
                            </div>

                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="frontPhoto"
                                    className="add_display_cab-label">
                                    Front Photo *
                                </label>
                                <input
                                    type="file"
                                    id="frontPhoto"
                                    name="frontPhoto"
                                    accept="image/*"
                                    onChange={handleFrontPhotoChange}
                                    required
                                    className="add_display_cab-file-input"
                                />
                                <small className="add_display_cab-helper-text">Select the main front view photo of the cab</small>
                                {errors.frontPhoto && <span className="add_display_cab-error">{errors.frontPhoto}</span>}

                                {cabData.frontPhoto && (
                                    <div className="add_display_cab-selected-files">
                                        <p className="add_display_cab-selected-label">Selected front photo:</p>
                                        <span className="add_display_cab-file-name">{cabData.frontPhoto.name}</span>
                                    </div>
                                )}
                            </div>

                            <div className="add_display_cab-form-group">
                                <label
                                    htmlFor="additionalPhotos"
                                    className="add_display_cab-label">
                                    Additional Photos *
                                </label>
                                <input
                                    type="file"
                                    id="additionalPhotos"
                                    name="additionalPhotos"
                                    multiple
                                    accept="image/*"
                                    onChange={handleAdditionalPhotosChange}
                                    required
                                    className="add_display_cab-file-input"
                                />
                                <small className="add_display_cab-helper-text">Select additional photos (interior, side views, etc.)</small>
                                {errors.additionalPhotos && <span className="add_display_cab-error">{errors.additionalPhotos}</span>}

                                {cabData.additionalPhotos.length > 0 && (
                                    <div className="add_display_cab-selected-files">
                                        <p className="add_display_cab-selected-label">Selected additional photos:</p>
                                        <ul className="add_display_cab-file-list">
                                            {Array.from(cabData.additionalPhotos).map((file, index) => (
                                                <li
                                                    key={index}
                                                    className="add_display_cab-file-item">
                                                    {file.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="add_display_cab-form-actions">
                                <button
                                    type="submit"
                                    disabled={cabLoading}
                                    className="add_display_cab-submit-btn">
                                    {cabLoading ? 'Registering...' : 'Register Cab'}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="add_display_cab-reset-btn"
                                    disabled={cabLoading}>
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default AddDisplayCab;
