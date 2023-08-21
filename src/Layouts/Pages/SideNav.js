import React, { useState } from "react";
import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import logo from "../../assets/Images/logo.png";
import onlylogo from "../../assets/Images/onlylogo.png";
import { FaTimes } from "react-icons/fa"; // Import icons
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../Redux/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/NavBar.css";

const SideNav = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const logoutFn = () => {
    const data = {
      UserId: loginDetails?.logindata?.userId,
    };

    dispatch(
      Logout(data, loginDetails?.logindata?.Token, (callback) => {
        if (callback.status) {
          navigate("/");
        } else {
          toast.error("Invalid credentials");
        }
      })
    );
  };
  return (
    <div
      style={{
        height: "100vh",
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      {expanded ? (
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-image"
            onClick={(expanded) => setExpanded(expanded)}
          />
        </div>
      ) : (
        <>
          {!expanded ? (
            <img
              src={onlylogo}
              alt="Logo"
              className="onlylogo-image"
              onClick={(expanded) => setExpanded(expanded)}
            />
          ) : (
            <FaTimes />
          )}
        </>
      )}
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            {loginDetails?.logindata?.UserType == "1" ? (
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Bookings
              </Nav.Item>
            ) : (
              <></>
            )}

            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              User Group
            </Nav.Item>
            {loginDetails?.logindata?.UserType == "1" ? (
              <Nav.Menu
                placement="rightStart"
                eventKey="3"
                title="Users"
                icon={<MagicIcon />}
              >
                <Nav.Item eventKey="3-1">Manager</Nav.Item>
                <Nav.Item eventKey="3-2">GRE</Nav.Item>
                <Nav.Item eventKey="3-3">Accounts</Nav.Item>
                <Nav.Item eventKey="3-4">Driver</Nav.Item>
              </Nav.Menu>
            ) : (
              <></>
            )}

            {loginDetails?.logindata?.UserType == "1" ? (
              <Nav.Item
                eventKey="6"
                icon={<DashboardIcon />}
                onClick={logoutFn}
              >
                Logout
              </Nav.Item>
            ) : (
              <></>
            )}
          </Nav>
          <ToastContainer />
        </Sidenav.Body>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
    </div>
  );
};

export default SideNav;
