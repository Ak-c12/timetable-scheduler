import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const credentials = {
      username: username,
      password: password,
    };
    console.log("the passed credentials is: ", credentials);

    const response = await api.post("/login", credentials);
    console.log("register response is ", response);
    return response;
  } catch (error) {
    console.log("the error message for register route is ", error);
    throw error;
  }
};

export const adminLogin = async (username, password) => {
  try {
    const credentials = {
      username: username,
      password: password,
    };
    console.log("the passed credentials is: ", credentials);

    const response = await api.post("/admin/login", credentials);
    console.log("register response is ", response);
    return response.data;
  } catch (error) {
    console.log("the error message for register route is ", error);
    throw error;
  }
};

export const register = async (username, password, role) => {
  try {
    const credentials = {
      username: username,
      password: password,
      role: role,
    };
    console.log("the passed credentials is: ", credentials);

    const response = await api.post("/register", credentials);
    console.log("register response is ", response);
    return response.data;
  } catch (error) {
    console.log("the error message for register route is ", error);
    throw error;
  }
};

export const gettimetable = async () => {
  try {

    const response = await api.post("/teacher/timetable");  
    console.log("register response is ", response);
    return response.data;
  } catch (error) {
    console.log("the error message for register route is ", error);
    throw error;
  }
};

export const ApiCourses = async () => {
  try {
    const response = await api.get("/courses");
    console.log("courses response is ", response);
    return response.data;
  } catch (error) {
    console.log("the error message for courses route is ", error);
    throw error;
  }
};