"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import Link from "next/link";
import { BsHandbag } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "lib/axios";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

const DashBoardNavbar = () => {
  const [booking, setBooking] = useState([]);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const { data: session } = useSession();

  const {
    data: bookings = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", session?.user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/my-booking/api/${session?.user?.email}`
      );
      return response.data.myBookings;
    },
    enabled: !!session?.user?.email,
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosSecure.get(
          "/checkout/api/all-bookings"
        );
        setBooking(res?.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    refetch();
    fetchBooking();
  }, []);

  if (isLoading) {
    refetch();
  } else {
    refetch();
  }

  if (refetch) {
    refetch();
  }

  const userNavItem = [
    { title: "My Booking", path: "/dashboard/user/my-booking" },
    { title: "Order Review", path: "/dashboard/user/order-review" },
    { title: "Manage Inventory", path: "/manageInventory" },
    { title: "Home", path: "/" },
  ];

  const adminNavItem = [
    { title: "Services", path: "/dashboard/admin/services" },
    { title: "All Users", path: "/dashboard/admin/all-users" },
    {
      title: "Manage All Bookings",
      path: "/dashboard/admin/all-bookings",
    },
    { title: "Home", path: "/" },
  ];

  const navItems =
    session?.user?.role === "admin" ? adminNavItem : userNavItem;
  return (
    <div className="pt-16 max-w-[1140px] mx-auto bg-white navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-200 rounded-box z-[1] mt-3 w-52 p-5 shadow space-y-6 "
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Image
          width={100}
          height={54}
          src={"/assets/logo.svg"}
          alt="logo"
        />
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 space-x-6 menu menu-horizontal">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`font-semibold text-black hover:text-[var(--Dark-02, #444)] text-sm relative ${
                  pathname === item.path ? "active-nav" : ""
                }`}
              >
                {item.title}
                {pathname === item.path && (
                  <span className="absolute left-0 right-0 h-[2px] bg-[#FF3811] bottom-[-6px]"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="gap-5 navbar-end">
        <div className="relative">
          {/* Tooltip (optional) */}
          <div title="View Dashboard" arrow>
            <div className="relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
              {/* Notification badge for bookings */}
              <p className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center bg-[#FF3811] text-white text-xs font-bold rounded-full transition-opacity duration-300 ease-in-out hover:opacity-80">
              {session?.user?.role === "admin" ? booking.length : bookings.length}
              </p>
              <BsHandbag className="text-black transition-transform duration-300 ease-in-out w-7 h-7 hover:scale-110 hover:text-[#FF3811]" />
            </div>
          </div>
        </div>
        <button
          className="btn px-[28px] py-[15px] bg-white 
        border-[#FF3811] text-[#FF3811] hover:bg-[#FF3811] hover:text-white hover:border-[#FF3811]"
        >
          Appointment
        </button>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
