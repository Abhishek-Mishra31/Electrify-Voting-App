import React, { useContext, useState } from "react";
import voteContext from "../Context/vote/Votecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Contactus = () => {
  const [credentials, SetCrendentials] = useState({
    name: "",
    email: "",
    message: "",
  });
  const context = useContext(voteContext);
  const { sendContact } = context;

  const handleContact = async (e) => {
    e.preventDefault();
    const result = await sendContact(
      credentials.name,
      credentials.email,
      credentials.message
    );
    if (result.success) {
      toast.success("Thanks for your feedback.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      toast.error("kindly try again...", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
    SetCrendentials({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    SetCrendentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Contact Us
        </h1>
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=Gaya,%20Bihar&hl=en&z=14&output=embed"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
            ></iframe>
            <div
              className="contactDetails relative flex flex-wrap py-6 rounded shadow-md"
              style={{ backgroundColor: "rgb(44, 47, 60)" }}
            >
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className=" text-white mt-1">Gaya , Bihar</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0 ">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                  EMAIL
                </h2>
                <a
                  className="text-indigo-500 leading-relaxed  hover:underline"
                  href="mailto:abhishek.kumar.devx@gmail.com"
                >
                  abhishek.kumar.devx@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-white text-lg mb-1 font-medium title-font">
              Feedback
            </h2>
            <div className="relative mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={credentials.message}
                placeholder="Enter Your Feedback Here...."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleContact}
            >
              Send Message
            </button>
            <p className="text-xs text-white mt-3">
              We Value Your Feedback Thank you for visiting our website!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactus;
