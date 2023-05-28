import React, { useEffect, useState } from "react";
import "./employee.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/userData";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  function handleSubmit(e) {
    e.preventDefault();
    api
      .put(`/users/${id}`, userData)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Link to="/" className="formLink">
        Go to home
      </Link>
      <form className="formData" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <label htmlFor="Profile">Profile</label>
        <input
          type="text"
          name="Profile"
          placeholder="enter Profile"
          value={userData.profile}
          onChange={(e) =>
            setUserData({ ...userData, profile: e.target.profile })
          }
        />
        <label htmlFor="Location">Location</label>
        <input
          type="text"
          name="Location"
          placeholder="enter Location"
          value={userData.location}
          onChange={(e) =>
            setUserData({ ...userData, location: e.target.location })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EmployeeEdit;
