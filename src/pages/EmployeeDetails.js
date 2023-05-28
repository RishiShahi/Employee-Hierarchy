import React, { useEffect, useState } from "react";
import "./employee.css";
import { Link, useParams } from "react-router-dom";
import api from "../api/userData";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    id: id,
    name: "",
    profile: "",
    location: "",
    type: "",
    image: "",
  });

  const retrieveData = async () => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };

  useEffect(() => {
    const getAllData = async () => {
      const data = await retrieveData();
      setUserData({
        ...userData,
        name: data.name,
        profile: data.profile,
        location: data.location,
      });
    };
    getAllData();
  }, []);

  return (
    <>
      <Link to="/" className="formLink">
        Go to home
      </Link>
      <div className="empDetails">
        <img src={userData.image} alt={userData.name} />
        <h3>{userData.name}</h3>
        <div className="profile">
          <span>{userData.profile}</span>
        </div>
        <div className="location">
          <span>{userData.location}</span>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
