import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/global.css";

const AddEditCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const categoryData = location.state?.categoryData;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        discountPercentage: "",
        commissionPercentage: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // If editing, populate form with existing data
    useEffect(() => {
        if (categoryData) {
            setFormData({
                name: categoryData.name || "",
                description: categoryData.description || "",
                discountPercentage: categoryData.discountPercentage || "",
                commissionPercentage: categoryData.commissionPercentage || "",
            });
        }
    }, [categoryData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Category name is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.discountPercentage) {
            newErrors.discountPercentage = "Discount percentage is required";
        } else if (
            parseFloat(formData.discountPercentage) < 0 ||
            parseFloat(formData.discountPercentage) > 100
        ) {
            newErrors.discountPercentage = "Discount must be between 0 and 100";
        }

        if (!formData.commissionPercentage) {
            newErrors.commissionPercentage = "Commission percentage is required";
        } else if (
            parseFloat(formData.commissionPercentage) < 0 ||
            parseFloat(formData.commissionPercentage) > 100
        ) {
            newErrors.commissionPercentage = "Commission must be between 0 and 100";
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
            if (categoryData) {
                toast.success("Category updated successfully!");
            } else {
                toast.success("Category created successfully!");
            }
            setTimeout(() => {
                navigate("/CategoryList");
            }, 1500);
        }, 1000);
    };

    const handleCancel = () => {
        navigate("/CategoryList");
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">
                {categoryData ? "Edit Category" : "Add New Category"}
            </h3>

            <div className="card">
                <div className="card-body">
                    {categoryData && categoryData.activeProfiles > 0 && (
                        <div className="alert alert-warning mb-4">
                            <strong>Warning:</strong> This category has{" "}
                            <strong>{categoryData.activeProfiles}</strong> active profiles.
                            Changing discount or commission rates will affect all bookings
                            from these profiles.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Category Name */}
                            <div className="col-md-12 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Category Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Feet on Street Agent"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description <span style={{ color: "red" }}>*</span>
                                </label>
                                <textarea
                                    className={`form-control ${errors.description ? "is-invalid" : ""
                                        }`}
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of this category"
                                    rows="3"
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description}</div>
                                )}
                            </div>

                            {/* Discount Percentage */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="discountPercentage" className="form-label">
                                    Discount Percentage <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.discountPercentage ? "is-invalid" : ""
                                            }`}
                                        id="discountPercentage"
                                        name="discountPercentage"
                                        value={formData.discountPercentage}
                                        onChange={handleChange}
                                        placeholder="10"
                                    />
                                    <span className="input-group-text">%</span>
                                    {errors.discountPercentage && (
                                        <div className="invalid-feedback">
                                            {errors.discountPercentage}
                                        </div>
                                    )}
                                </div>
                                <small className="form-text text-muted">
                                    This discount will be automatically applied to all profiles in
                                    this category.
                                </small>
                            </div>

                            {/* Commission Percentage */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="commissionPercentage" className="form-label">
                                    Commission Percentage <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.commissionPercentage ? "is-invalid" : ""
                                            }`}
                                        id="commissionPercentage"
                                        name="commissionPercentage"
                                        value={formData.commissionPercentage}
                                        onChange={handleChange}
                                        placeholder="5"
                                    />
                                    <span className="input-group-text">%</span>
                                    {errors.commissionPercentage && (
                                        <div className="invalid-feedback">
                                            {errors.commissionPercentage}
                                        </div>
                                    )}
                                </div>
                                <small className="form-text text-muted">
                                    Commission rate for all profiles in this category.
                                </small>
                            </div>

                            {/* Preview Box */}
                            {formData.discountPercentage && formData.commissionPercentage && (
                                <div className="col-md-12 mb-3">
                                    <div
                                        className="alert alert-success"
                                        style={{ backgroundColor: "#e8f5e9", border: "none" }}
                                    >
                                        <strong>Preview:</strong>
                                        <ul className="mb-0 mt-2">
                                            <li>
                                                Customers will receive a{" "}
                                                <strong>{formData.discountPercentage}%</strong> discount
                                                on bookings
                                            </li>
                                            <li>
                                                Agents will earn a{" "}
                                                <strong>{formData.commissionPercentage}%</strong>{" "}
                                                commission
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
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
                                        {categoryData ? "Updating..." : "Creating..."}
                                    </>
                                ) : categoryData ? (
                                    "Update Category"
                                ) : (
                                    "Create Category"
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

export default AddEditCategory;
