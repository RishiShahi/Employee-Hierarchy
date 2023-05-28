import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./employee.css";
import api from "../api/userData";

const EmployeeCreate = () => {
  const [data, setData] = useState({ name: "", profile: "", location: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.name === "" || data.location === "" || data.profile === "") {
      alert("All fields are mandatory");
      return;
    }
    const request = {
      id: uuidv4(),
      type: propsData,
      image: "../../public/images/simon.png",
      name: data.name,
      profile: data.profile,
      location: data.location,
    };

    await api.post("/users", request);
    navigate("/");
  };

  return (
    <>
      <Link to="/" className="formLink">
        Go to home
      </Link>
      <form className="formData" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="Profile">Profile</label>
        <input
          type="text"
          id="Profile"
          value={data.profile}
          onChange={(e) => setData({ ...data, profile: e.target.value })}
        />
        <label htmlFor="Location">Location</label>
        <input
          type="text"
          id="Location"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default EmployeeCreate;
