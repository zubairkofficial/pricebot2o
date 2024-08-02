import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import img from "./44.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../Components/HeaderContext';

const Dashboard = () => {

  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: 'Armaturenbrett', desc: 'Lassen Sie uns noch heute Ihr Update überprüfen' });
  }, [setHeaderData]);

  const [services, setServices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;
  useEffect(() => {
    fetchServices();
  }, []);

  const userServices = Helpers.authUser.services || [];

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}active-services`,
        Helpers.authHeaders
      );
      if (response.status != 200) {
        throw new Error("Failed to fetch services");
      }
      setServices(response.data);
    } catch (error) {
      Helpers.toast("error", error.message);
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
    <div className="w-full mb-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="w-full p-2" 
          >
            <Link
              to={isServiceEnabled(service.id) ? `/${service.link}` : "#"}
              className="block text-decoration-none relative"
            >
              <div
                className={`shadow-sm rounded-lg p-5 transition-opacity ${isServiceEnabled(service.id) ? "opacity-90" : "opacity-50"
                  }`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  height: "200px", 
                }}
              >
                {!isServiceEnabled(service.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faLock} size="2x" />
                  </div>
                )}
                <div className="flex flex-col justify-end h-full">
                  <h3 className=" text-lg text-white font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-white text-base">{service.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
