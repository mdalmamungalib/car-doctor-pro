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
  (response) => response, async (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 403)
    ) {
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
    return Promise.reject(error);
  }
);

export default axiosSecure;
