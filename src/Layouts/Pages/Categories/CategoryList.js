import React, { useState, useEffect } from "react";
import "../../../assets/ManagerList.css";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import "../../../assets/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { getAllCategories } from "../../../Redux/actions/users";

// Dummy data for categories
const DUMMY_CATEGORIES = [
    {
        id: 1,
        name: "Feet on Street Agent",
        discountPercentage: 10,
        commissionPercentage: 5,
        description: "Agents who actively promote on the streets and public areas",
        activeProfiles: 12,
        createdAt: "2024-01-10",
    },
    {
        id: 2,
        name: "Alliances",
        discountPercentage: 15,
        commissionPercentage: 7,
        description: "Strategic partnership agents and corporate alliances",
        activeProfiles: 8,
        createdAt: "2024-01-10",
    },
    {
        id: 3,
        name: "Taxi Agent",
        discountPercentage: 8,
        commissionPercentage: 4,
        description: "Taxi drivers and transportation service providers",
        activeProfiles: 25,
        createdAt: "2024-01-10",
    },
    {
        id: 4,
        name: "Local Agent",
        discountPercentage: 12,
        commissionPercentage: 6,
        description: "Local area agents and community representatives",
        activeProfiles: 15,
        createdAt: "2024-01-10",
    },
];

const CategoryList = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    const loginDetails = useSelector(
        (state) => state.auth?.userDetailsAfterLogin.Details
    );

    const fetchCategories = () => {
        setLoading(true);
        dispatch(
            getAllCategories(loginDetails?.logindata?.Token, (callback) => {
                setLoading(false);
                if (callback.status) {
                    setCategories(callback?.response?.Details || []);
                } else {
                    toast.error(callback.error || "Failed to fetch categories");
                }
            })
        );
    };

    useEffect(() => {
        if (loginDetails?.logindata?.Token) {
            fetchCategories();
        }
    }, [dispatch, loginDetails]);

    const handleViewDetails = (category) => {
        setSelectedCategory(category);
        setShowViewModal(true);
    };

    const handleCloseView = () => {
        setShowViewModal(false);
        setSelectedCategory({});
    };

    return (
        <div>
            <h3 className="mb-4">Category Management</h3>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="alert alert-info" style={{ backgroundColor: "#e3f2fd", border: "none" }}>
                            <strong>About Categories:</strong> Categories define discount and commission rules that automatically apply to all profiles within that category.
                            This ensures consistent pricing across all agents in the same category.
                        </div>
                    </div>
                    <div className="col-md-12 d-flex justify-content-end mb-3">
                        <button className="btn btn-primary">
                            <Link to="/AddCategory" className="addLinks">
                                Add Category
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                {loading ? (
                    <div className="col-12 text-center">
                        <Oval
                            height={80}
                            width={50}
                            color="#4fa94d"
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="col-12 text-center">
                        <p>No categories found.</p>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={category.Id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title mb-0">{category.Name}</h5>
                                        <Link
                                            to="/AddCategory"
                                            state={{ categoryData: category }}
                                            className="links"
                                        >
                                            <AiFillEdit
                                                style={{ color: "#1976d2", fontSize: "20px" }}
                                            />
                                        </Link>
                                    </div>

                                    <p className="card-text text-muted" style={{ fontSize: "14px" }}>
                                        {category.Description || "No description available"}
                                    </p>

                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span style={{ fontWeight: "500" }}>Discount:</span>
                                            <span className="badge bg-success">
                                                {category.DiscountPercent}%
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span style={{ fontWeight: "500" }}>Commission:</span>
                                            <span className="badge bg-primary">
                                                {category.CommissionPercent || 0}%
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span style={{ fontWeight: "500" }}>Status:</span>
                                            <span className={`badge ${category.IsActive ? 'bg-info' : 'bg-secondary'}`}>
                                                {category.IsActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-outline-primary btn-sm mt-3 w-100"
                                        onClick={() => handleViewDetails(category)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ToastContainer />

            {/* View Details Modal */}
            <Modal show={showViewModal} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Category Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{selectedCategory.Name}</h5>
                    <p className="text-muted">{selectedCategory.Description || "No description available"}</p>

                    <hr />

                    <div className="mb-3">
                        <strong>Pricing Rules:</strong>
                        <ul className="mt-2">
                            <li>Discount Rate: <strong>{selectedCategory.DiscountPercent}%</strong></li>
                            <li>Commission Rate: <strong>{selectedCategory.CommissionPercent || 0}%</strong></li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <strong>Statistics:</strong>
                        <ul className="mt-2">
                            <li>Status: <strong>{selectedCategory.IsActive ? "Active" : "Inactive"}</strong></li>
                            <li>Created: <strong>{selectedCategory.currentTs || "-"}</strong></li>
                        </ul>
                    </div>

                    <div className="alert alert-warning" style={{ fontSize: "14px" }}>
                        <strong>Note:</strong> Changing discount or commission rates will affect all profiles in this category.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                    <Link
                        to="/AddCategory"
                        state={{ categoryData: selectedCategory }}
                        className="btn btn-primary"
                    >
                        Edit Category
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryList;
