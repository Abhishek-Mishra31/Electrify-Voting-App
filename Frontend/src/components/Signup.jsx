import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import voteContext from "../Context/vote/Votecontext";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(voteContext);
  const { userSignUp } = context;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    aadharnumber: "",
    phone: "",
    password: "",
  });

  // this method is resposible for signUp
  const HandleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await userSignUp(
        details.name,
        details.email,
        details.aadharnumber,
        details.phone,
        details.password
      );
      if (result.success) {
        localStorage.setItem("token", result.token);
        toast.success("Signup done!, kindly log-in", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/");
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

  // this is method to set value from target to name
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <section className="signup">
        <div className="signup-container flex flex-col justify-center items-center  ">
          <div className="signup w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <form className="max-w-sm mx-auto" onSubmit={HandleSignup}>
              <div className="heading">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Interactive Voting Experience
                </h1>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Sign-Up Now
                </h1>
              </div>
              <div className="mb-3 my-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  value={details.email}
                  onChange={handleChange}
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="Email"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  id="aadharnumber"
                  value={details.aadharnumber}
                  onChange={handleChange}
                  name="aadharnumber"
                  className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="Aadhar-Number"
                />
              </div>

              <div className="mb-3">
                <input
                  type="type"
                  id="phone"
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="phone"
                />
              </div>

              <div className="mb-3 relative ">
                <input
                  type="password"
                  id="password"
                  value={details.password}
                  onChange={handleChange}
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-black placeholder-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="Password"
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

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader size={20} color="#ffffff" />
                  <span className="text-white">
                    Please wait, we're setting up your account...
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
