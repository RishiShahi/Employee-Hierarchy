import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/userData";
import "./dashboard.css";
import Admin from "../adminFolder/Admin";
import PurchaseManager from "../purchaseManager/PurchaseManager";
import Sales from "../sales/Sales";
import StoreManager from "../storeManager/StoreManager";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showSales, setShowSales] = useState(false);
  const [showPurchaseMan, setShowPurchaseMan] = useState(false);
  const [showStoreMan, setShowStoreMan] = useState(false);

  const navigate = useNavigate();

  const removeUserData = async (id) => {
    await api.delete(`/users/${id}`);
    const newUserData = userData.filter((data) => data.id !== id);
    setUserData(newUserData);
  };

  const handleSubmit = async () => {
    const response = await api.get(`/users?q=${search}`);
    const employeeData = response.data;
    setFilteredData(employeeData);
    navigate("/employee/results", { state: { filteredData: filteredData } });
    setSearch("");
  };

  const retrieveData = async () => {
    const response = await api.get("/users");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllData = async () => {
      const data = await retrieveData();
      if (data) setUserData(data);
    };
    getAllData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Employee Hierarchy</h1>
      <div className="search">
        <input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, profile, location"
        />
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {userData.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="App">
          <Admin data={userData} removeUserData={removeUserData} />
          <div className="category">
            <div>
              <button className="btn" onClick={() => setShowSales(!showSales)}>
                Sales
              </button>
              <Sales
                data={userData}
                showSales={showSales}
                removeUserData={removeUserData}
              />
            </div>
            <div>
              <button
                className="btn"
                onClick={() => setShowPurchaseMan(!showPurchaseMan)}
              >
                PurchaseManager
              </button>
              <PurchaseManager
                data={userData}
                showPurchaseMan={showPurchaseMan}
                removeUserData={removeUserData}
              />
            </div>
            <div>
              <button
                className="btn"
                onClick={() => setShowStoreMan(!showStoreMan)}
              >
                StoreManager
              </button>
              <StoreManager
                data={userData}
                showStoreMan={showStoreMan}
                removeUserData={removeUserData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
