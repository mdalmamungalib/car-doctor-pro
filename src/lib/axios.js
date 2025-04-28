// lib/axios.js
import axios from "axios";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
export const dynamic = "force-dynamic";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle 401 or 403 errors
      if (error.response.status === 401 || error.response.status === 403) {
        await signOut({ redirect: false });
        Swal.fire({
          icon: "error",
          title: "Unauthorized!",
          text: "Please log in again.",
        });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      // Handle other errors (e.g., server error 500)
      else if (error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Server Error!",
          text: "Something went wrong. Please try again later.",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
