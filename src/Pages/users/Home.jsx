import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import img from "./44.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const FileUpload = () => {
  const [userServices, setUserServices] = useState([]);
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
   
    const storedServices = localStorage.getItem("user_Services");
    if (storedServices) {
      const parsedServices = JSON.parse(storedServices);
      setUserServices(parsedServices);
    } else {
     
      setUserServices([]);
    }
  }, []);

  const services = [
    {
      id: "fileupload",
      name: "Sthamer",
      description:
        "Umfassende KI-gesteuerte Dateianalyse- und Insights-Plattform",
      img: "../../../public/assets/44.jpeg",
      link: "fileupload",
    },
  ];

  useEffect(() => {
    if (successMessage) {
      Helpers.toast("success", successMessage);
      // Clear the state after displaying the message
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [successMessage, navigate, location.pathname]);

  // Check if a service is enabled or if the userServices array is empty
  const isServiceEnabled = (serviceName) => {
    // If no services stored, return true (all services enabled)
    if (userServices.length === 0) return true;

    // Otherwise, check if the service is included in userServices
    return userServices.includes(serviceName);
  };

  return (
    <Container
      fluid
      className="p-0 min-vh-100 d-flex flex-column mt-5"
      style={{ overflow: "hidden" }}
    >
      <Row className="flex-grow-1">
        <Col xs={2} lg={2} className="px-0">
          {/* Sidebar Placeholder */}
        </Col>
        <Col xs={12} lg={10} className="mt-3">
          <h2 className="ps-3 text-center text-white">Tool-Dashboard</h2>
          <Container className="px-lg-5">
            <Row className="mb-4 g-4 pt-4">
              {services.map((service) => (
                <Col xs={12} md={6} lg={4} key={service.id}>
                  <Link
                    to={isServiceEnabled(service.name) ? `/${service.id}` : "#"}
                    className="text-decoration-none"
                    style={{ position: "relative" }}
                  >
                    <Card
                      className={`shadow-sm ${
                        isServiceEnabled(service.name) ? "" : "disabled"
                      }`}
                      style={{
                        cursor: "pointer",
                        borderRadius: "0.75rem",
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img})`,
                        backgroundSize: "150%", // This makes the image larger by 50% than its normal size
                        backgroundPosition: "center",
                        color: "white",
                        height: "180px",
                        opacity: isServiceEnabled(service.name) ? 0.9 : 0.5,
                      }}
                    >
                      {!isServiceEnabled(service.name) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <FontAwesomeIcon icon={faLock} size="2x" />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column ">
                        <Card.Title style={{ color: "white" }}>
                          {service.name}
                        </Card.Title>
                        <Card.Text>{service.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
