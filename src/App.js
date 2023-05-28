import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeSearchResults from "./pages/EmployeeSearchResults";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/employee/create" element={<EmployeeCreate />}></Route>
          <Route path="/employee/edit/:id" element={<EmployeeEdit />}></Route>
          <Route
            path="/employee/view/:id"
            element={<EmployeeDetails />}
          ></Route>
          <Route
            path="/employee/results"
            element={<EmployeeSearchResults />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
