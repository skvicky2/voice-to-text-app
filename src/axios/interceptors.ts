import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

const navigationRef = React.createRef<any>();
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOBILE_APP_API_BASE_URL, // CHANGE THIS
});

// ------------------------
// REQUEST INTERCEPTOR
// ------------------------
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

// ------------------------
// RESPONSE INTERCEPTOR
// ------------------------
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("❌ RESPONSE ERROR:", error);

    // Handle 401 – Token expired
    if (error.response?.status === 401) {
      console.log("🔒 Token expired → logging out");

      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("emailId");
      navigationRef.current.navigate("Login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
