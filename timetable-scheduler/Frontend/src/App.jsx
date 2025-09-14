import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/Pages/Dashboard/dashboard";
import Teachers from "../src/Pages/Teachers/teachers";
import Courses from "../src/Pages/Courses/Course";
import Rooms from "../src/Pages/Rooms/Rooms";
import Timetable from "../src/Pages/Timetable/Timetable";
import Login from "../src/Pages/Login/login";
import Layout from "../src/Layout/Layout";
import PrivateRoute from "../src/Routes/PrivateRoute";
import React from "react";
// import TestShadcn from "../src/Pages/TestShadcn";


function App() {
  return (
    
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/courses" element={<Courses />} />

          <Route path="/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
          <Route path="/timetable" element={<PrivateRoute><Timetable /></PrivateRoute>} />
          <Route path="*" element={<Login />} />
          
        </Routes>
     </Layout>

  );
}

export default App;
