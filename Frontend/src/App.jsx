import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/Pages/Dashboard/dashboard";
import Teachers from "../src/Pages/Teachers/teachers";
import Courses from "../src/Pages/Courses/course2";
import Rooms from "../src/Pages/Rooms/Rooms";
import Timetable from "../src/Pages/Timetable/Timetable";
import Login from "../src/Pages/Login/login";
import Layout from "../src/Layout/Layout";
import Register from "../src/Pages/Register/register";
import PrivateRoute from "../src/Routes/PrivateRoute";
import React from "react";

// import TestShadcn from "../src/Pages/TestShadcn";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
            // </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            // <Layout>
              <Login />
            // </Layout>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/teachers"
          element={
            <Layout>
              <Teachers />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/rooms"
          element={
            // <PrivateRoute>
            <Rooms />
            // </PrivateRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <Layout>
              <Timetable />
            </Layout>
          }
        />
      </Routes>
      {/* </Layout> */}

      {/* <Routes>
       
      </Routes> */}
    </>
  );
}

export default App;
