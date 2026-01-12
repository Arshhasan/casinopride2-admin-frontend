import React, { useState, useEffect } from "react";
import "../../../assets/ManagerList.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import "../../../assets/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import more from "../../../assets/Images/more.png";

// Dummy data for profiles
const DUMMY_PROFILES = [
  {
    id: 1,
    name: "Rajesh Kumar",
    mobile: "+91 9876543210",
    email: "rajesh.kumar@example.com",
    categoryId: 1,
    categoryName: "Feet on Street Agent",
    url: "https://casinopride.com/book/agent1",
    status: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    mobile: "+91 9876543211",
    email: "priya.sharma@example.com",
    categoryId: 2,
    categoryName: "Alliances",
    url: "https://casinopride.com/book/alliance1",
    status: true,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Amit Patel",
    mobile: "+91 9876543212",
    email: "amit.patel@example.com",
    categoryId: 3,
    categoryName: "Taxi Agent",
    url: "https://casinopride.com/book/taxi1",
    status: true,
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Sunita Desai",
    mobile: "+91 9876543213",
    email: "sunita.desai@example.com",
    categoryId: 4,
    categoryName: "Local Agent",
    url: "https://casinopride.com/book/local1",
    status: false,
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Vikram Singh",
    mobile: "+91 9876543214",
    email: "vikram.singh@example.com",
    categoryId: 1,
    categoryName: "Feet on Street Agent",
    url: "https://casinopride.com/book/agent1",
    status: true,
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    name: "Neha Gupta",
    mobile: "+91 9876543215",
    email: "neha.gupta@example.com",
    categoryId: 2,
    categoryName: "Alliances",
    url: "https://casinopride.com/book/alliance2",
    status: true,
    createdAt: "2024-03-01",
  },
  {
    id: 7,
    name: "Arjun Reddy",
    mobile: "+91 9876543216",
    email: "arjun.reddy@example.com",
    categoryId: 3,
    categoryName: "Taxi Agent",
    url: "https://casinopride.com/book/taxi1",
    status: true,
    createdAt: "2024-03-05",
  },
  {
    id: 8,
    name: "Kavita Nair",
    mobile: "+91 9876543217",
    email: "kavita.nair@example.com",
    categoryId: 4,
    categoryName: "Local Agent",
    url: "https://casinopride.com/book/local2",
    status: true,
    createdAt: "2024-03-10",
  },
];

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProfileList, setFilterProfileList] = useState([]);
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  // Simulate API call with dummy data
  useEffect(() => {
    setTimeout(() => {
      setProfiles(DUMMY_PROFILES);
      setFilterProfileList(DUMMY_PROFILES);
      setLoading(false);
    }, 1000);
  }, []);

  const filterProfileDetails = (value) => {
    if (value?.trim() === "") {
      setFilterProfileList(profiles);
    } else {
      const lowerCaseQuery = value?.toLowerCase();
      const filtered = profiles.filter(
        (item) =>
          item?.name?.toLowerCase()?.includes(lowerCaseQuery) ||
          item?.mobile?.includes(value) ||
          item?.email?.toLowerCase()?.includes(lowerCaseQuery) ||
          item?.categoryName?.toLowerCase()?.includes(lowerCaseQuery)
      );
      setFilterProfileList(filtered);
    }
  };

  const handleViewMore = (profile) => {
    setSelectedProfile(profile);
    setShowViewMoreModal(true);
  };

  const handleCloseViewMore = () => {
    setShowViewMoreModal(false);
    setSelectedProfile({});
  };

  const handleDeleteClick = (profileId) => {
    setProfileToDelete(profileId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Simulate delete operation
    const updatedProfiles = profiles.filter((p) => p.id !== profileToDelete);
    setProfiles(updatedProfiles);
    setFilterProfileList(updatedProfiles);
    setShowDeleteModal(false);
    toast.success("Profile deleted successfully!");
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setProfileToDelete(null);
  };

  return (
    <div>
      <h3 className="mb-4">Profile Management</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, mobile, email, or category"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterProfileDetails(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-6 d-flex justify-content-end mb-3">
            <button className="btn btn-primary">
              <Link to="/AddProfile" className="addLinks">
                Add Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center table_heading">
              Name
            </th>
            <th scope="col" className="text-center table_heading">
              Mobile
            </th>
            <th scope="col" className="text-center table_heading">
              Email
            </th>
            <th scope="col" className="text-center table_heading">
              Category
            </th>
            <th scope="col" className="text-center table_heading">
              Status
            </th>
            <th scope="col" className="text-center table_heading">
              Edit
            </th>
            <th scope="col" className="text-center table_heading">
              View More
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
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
              </td>
            </tr>
          ) : filterProfileList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No profiles found.
              </td>
            </tr>
          ) : (
            filterProfileList.map((item) => (
              <tr key={item.id}>
                <td className="manager-list">{item.name}</td>
                <td className="manager-list">
                  {item.mobile ? item.mobile : "-"}
                </td>
                <td className="manager-list">
                  {item.email ? item.email : "-"}
                </td>
                <td className="manager-list">
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {item.categoryName}
                  </span>
                </td>
                <td className="manager-list">
                  {item.status ? (
                    <span style={{ color: "green" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>Inactive</span>
                  )}
                </td>
                <td className="manager-list">
                  <Link
                    to="/AddProfile"
                    state={{ profileData: item }}
                    className="links"
                  >
                    <AiFillEdit
                      style={{ color: "#C5CEE0", fontSize: "20px" }}
                    />
                  </Link>
                </td>
                <td
                  className="manager-list"
                  onClick={() => handleViewMore(item)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={more} className="more_img" alt="View more" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />

      {/* View More Modal */}
      <Modal show={showViewMoreModal} onHide={handleCloseViewMore}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="manager-list">
            <strong>Name:</strong> {selectedProfile.name}
          </p>
          {selectedProfile.mobile && (
            <p className="manager-list">
              <strong>Mobile:</strong> {selectedProfile.mobile}
            </p>
          )}
          {selectedProfile.email && (
            <p className="manager-list">
              <strong>Email:</strong> {selectedProfile.email}
            </p>
          )}
          <p className="manager-list">
            <strong>Category:</strong> {selectedProfile.categoryName}
          </p>
          {selectedProfile.url && (
            <p className="manager-list">
              <strong>Booking URL:</strong>{" "}
              <a
                href={selectedProfile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedProfile.url}
              </a>
            </p>
          )}
          <p className="manager-list">
            <strong>Status:</strong>{" "}
            {selectedProfile.status ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Inactive</span>
            )}
          </p>
          {selectedProfile.createdAt && (
            <p className="manager-list">
              <strong>Created At:</strong> {selectedProfile.createdAt}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewMore}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileList;
