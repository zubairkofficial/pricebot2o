import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import img from "./44.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";


const FileUpload = () => {
  const [userServices, setUserServices] = useState(Helpers.authUser.services || []);
  const [services, setServices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;
  useEffect(() => {
    fetchServices();
  }, []);


  const fetchServices = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}active-services`, Helpers.authHeaders);
      if (response.status != 200) {
        throw new Error("Failed to fetch services");
      }
      setServices(response.data);
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      Helpers.toast("success", successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [successMessage, navigate, location.pathname]);

  const isServiceEnabled = (serviceId) => {
    return userServices.includes(serviceId);
  };

  return (
    <Container
      fluid
      className="p-0 min-vh-100 d-flex flex-column mt-5"
      style={{ overflow: "hidden" }}
    >
      <Row className="flex-grow-1">
        <Col xs={2} lg={2} md={2} className="px-0">
          {/* Sidebar Placeholder */}
        </Col>
        <Col xs={10} lg={10} md={10} className="mt-3">
          <h2 className="ps-3 text-center">Tool-Dashboard</h2>
          <Container className="px-lg-5">
            <Row className="mb-4 g-4 pt-4">
              {services.map((service) => (
                <Col xs={12} md={6} lg={4} key={service.id}>
                  <Link
                    to={isServiceEnabled(service.id) ? `/${service.link}` : "#"}
                    className="text-decoration-none"
                    style={{ position: "relative" }}
                  >
                    <Card
                      className={`shadow-sm ${isServiceEnabled(service.id) ? "" : "disabled"
                        }`}
                      style={{
                        cursor: "pointer",
                        borderRadius: "0.75rem",
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img})`,
                        backgroundSize: "150%",
                        backgroundPosition: "center",
                        color: "white",
                        height: "180px",
                        opacity: isServiceEnabled(service.id) ? 0.9 : 0.5,
                      }}
                    >
                      {!isServiceEnabled(service.id) && (
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
