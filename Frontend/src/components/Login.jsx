import React, { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import voteContext from "../Context/vote/Votecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [Info, setInfo] = useState({ aadharnumber: "", password: "" });
  const context = useContext(voteContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { userLogin } = context;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // method for User Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (Info.aadharnumber.length !== 12) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    // Clear error and submit the form
    setError("");
    try {
      setLoading(true);
      const result = await userLogin(Info.aadharnumber, Info.password);
      if (result.success) {
        localStorage.setItem("token", result.token);
        setisLoggedIn(true);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/user");
      } else {
        toast.error("Invalid Aadhar-Number or Password", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Something went wrong, please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInfo({ ...Info, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      {!isLoggedIn && (
        <div className="adminLogin flex justify-end">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <Link
              to={"/AdminLogin"}
              className="inline-flex items-center text-white"
            >
              Admin's Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </button>
        </div>
      )}

      <section className="py-8 login">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto   md:h-[70vh] lg:py-0">
          <div className="w-full rounded-lg shado md:mt-0 sm:max-w-md xl:p-0 :">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Unlock Your Voting Power
              </h1>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in Now
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <input
                    type="text"
                    name="aadharnumber"
                    id="aadharnumber"
                    value={Info.aadharnumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,12}$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Aadhar-Number"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={Info.password}
                    placeholder="Password"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i
                      className="bx bx-show text-2xl cursor-pointer text-gray-600 hover:text-blue-500"
                      onClick={() => {
                        const pass = document.getElementById("password");
                        if (pass.type === "password") {
                          pass.type = "text";
                        } else {
                          pass.type = "password";
                        }
                      }}
                    ></i>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                  type="submit"
                  className="text-white bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-blue-500 dark:focus:ring-primary-800 border-2"
                >
                  Sign in
                </button>

                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <ClipLoader size={20} color="#ffffff" />
                    <span className="text-white">
                      Hang tight, we’re logging you in...
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <p className="text-xl font-extrabold text-white">
                  Don’t have an account yet?
                  <Link
                    to={"/signup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    style={{ color: "cyan" }}
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
