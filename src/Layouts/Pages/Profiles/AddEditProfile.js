import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/global.css";

// Dummy categories data
const DUMMY_CATEGORIES = [
    {
        id: 1,
        name: "Feet on Street Agent",
        discountPercentage: 10,
        commissionPercentage: 5,
    },
    {
        id: 2,
        name: "Alliances",
        discountPercentage: 15,
        commissionPercentage: 7,
    },
    {
        id: 3,
        name: "Taxi Agent",
        discountPercentage: 8,
        commissionPercentage: 4,
    },
    {
        id: 4,
        name: "Local Agent",
        discountPercentage: 12,
        commissionPercentage: 6,
    },
];

const AddEditProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const profileData = location.state?.profileData;

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        categoryId: "",
        url: "",
        status: true,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Load dummy categories
    useEffect(() => {
        setCategories(DUMMY_CATEGORIES);
    }, []);

    // If editing, populate form with existing data
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                mobile: profileData.mobile || "",
                email: profileData.email || "",
                categoryId: profileData.categoryId || "",
                url: profileData.url || "",
                status: profileData.status !== undefined ? profileData.status : true,
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[+]?[\d\s-()]+$/.test(formData.mobile)) {
            newErrors.mobile = "Invalid mobile number format";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Category is required";
        }

        if (!formData.url.trim()) {
            newErrors.url = "Booking URL is required";
        } else if (!/^https?:\/\/.+/.test(formData.url)) {
            newErrors.url = "URL must start with http:// or https://";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (profileData) {
                toast.success("Profile updated successfully!");
            } else {
                toast.success("Profile created successfully!");
            }
            setTimeout(() => {
                navigate("/ProfileList");
            }, 1500);
        }, 1000);
    };

    const handleCancel = () => {
        navigate("/ProfileList");
    };

    const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(formData.categoryId)
    );

    return (
        <div className="container mt-4">
            <h3 className="mb-4">
                {profileData ? "Edit Profile" : "Add New Profile"}
            </h3>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Name */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter agent name"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>

                            {/* Mobile */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile Number <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mobile ? "is-invalid" : ""
                                        }`}
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="+91 9876543210"
                                />
                                {errors.mobile && (
                                    <div className="invalid-feedback">{errors.mobile}</div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="agent@example.com"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>

                            {/* Category */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="categoryId" className="form-label">
                                    Category <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                    className={`form-control ${errors.categoryId ? "is-invalid" : ""
                                        }`}
                                    id="categoryId"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && (
                                    <div className="invalid-feedback">{errors.categoryId}</div>
                                )}
                            </div>

                            {/* Category Info Display */}
                            {selectedCategory && (
                                <div className="col-md-12 mb-3">
                                    <div
                                        className="alert alert-info"
                                        style={{ backgroundColor: "#e3f2fd", border: "none" }}
                                    >
                                        <strong>Category Details:</strong>
                                        <ul className="mb-0 mt-2">
                                            <li>
                                                Discount: {selectedCategory.discountPercentage}%
                                            </li>
                                            <li>
                                                Commission: {selectedCategory.commissionPercentage}%
                                            </li>
                                        </ul>
                                        <small className="text-muted">
                                            These rates will be automatically applied to all bookings
                                            from this profile.
                                        </small>
                                    </div>
                                </div>
                            )}

                            {/* Booking URL */}
                            <div className="col-md-12 mb-3">
                                <label htmlFor="url" className="form-label">
                                    Booking URL <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.url ? "is-invalid" : ""}`}
                                    id="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    placeholder="https://casinopride.com/book/agent1"
                                />
                                {errors.url && (
                                    <div className="invalid-feedback">{errors.url}</div>
                                )}
                                <small className="form-text text-muted">
                                    Multiple profiles can share the same URL. Tracking will be
                                    done via profile assignment.
                                </small>
                            </div>

                            {/* Status */}
                            <div className="col-md-12 mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="status"
                                        name="status"
                                        checked={formData.status}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="status">
                                        Active
                                    </label>
                                </div>
                                <small className="form-text text-muted">
                                    Inactive profiles cannot be used for new bookings.
                                </small>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        {profileData ? "Updating..." : "Creating..."}
                                    </>
                                ) : profileData ? (
                                    "Update Profile"
                                ) : (
                                    "Create Profile"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddEditProfile;
