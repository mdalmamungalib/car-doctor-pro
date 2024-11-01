"use client";
export const dynamic = "force-dynamic";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import HeadImage from "components/HomePage/HeadImage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosSecure from "lib/axios";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosSecure.post(
        `/contact/api/postdata`,
        data
      );

      // Show success notification
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF3811",
          background: "#f7f7f7",
          customClass: {
            title: "text-[#FF3811]",
            popup: "rounded-lg shadow-lg p-6",
          },
        });

        reset();
      }
    } catch (error) {
      console.error("Error posting data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <HeadImage title={"Contact"} subtitle={"Our Contact Area"} />
      <div className="container px-4 py-12 mx-auto">
        {/* Contact Details and Form */}
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="flex items-center">
              <FaPhoneAlt className="text-[#FF3811] text-2xl mr-4" />
              <p className="text-lg">+123 456 7890</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-[#FF3811] text-2xl mr-4" />
              <p className="text-lg">contact@yourwebsite.com</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-[#FF3811] text-2xl mr-4" />
              <p className="text-lg">
                1234 Street Name, City, Country
              </p>
            </div>
            {/* FAQ Section */}
            <div className="p-8 mb-12 bg-gray-100 rounded-lg shadow-md">
              <h2 className="mb-4 text-3xl font-semibold text-center text-[#FF3811]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <details className="p-4 bg-white rounded-lg shadow">
                  <summary className="font-semibold cursor-pointer">
                    What is the best way to contact customer
                    support?
                  </summary>
                  <p className="mt-2">
                    The best way to reach us is via our email:
                    support@yourwebsite.com. We typically respond
                    within 24 hours.
                  </p>
                </details>
                <details className="p-4 bg-white rounded-lg shadow">
                  <summary className="font-semibold cursor-pointer">
                    How long does it take to get a response?
                  </summary>
                  <p className="mt-2">
                    We aim to respond to all inquiries within 24-48
                    hours during business days.
                  </p>
                </details>
                <details className="p-4 bg-white rounded-lg shadow">
                  <summary className="font-semibold cursor-pointer">
                    Can I schedule a meeting or consultation?
                  </summary>
                  <p className="mt-2">
                    Yes, you can schedule a meeting by reaching out
                    via email. We will work with you to find a
                    suitable time.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-[#FF3811]">
              Get In Touch
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Your Name"
                  className="w-full bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                />
                {errors.name && (
                  <p className="text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                />
                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  {...register("text", {
                    required: "Your Message is required",
                  })}
                  rows="5"
                  placeholder="Your Message"
                  className="w-full bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#FF3811] text-white w-full py-3 rounded-md hover:bg-[#E13200] transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="mb-4 text-3xl font-semibold text-center text-[#FF3811]">
            Find Us Here
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508873!2d144.95565131548696!3d-37.81732797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5776de6ef25de6d!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1632722528909!5m2!1sen!2sau"
            width="100%"
            height="400"
            className="border-0 rounded-lg shadow-md"
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
