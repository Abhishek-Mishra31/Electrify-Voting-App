import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import voteContext from "../Context/vote/Votecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const AdminLogin = () => {
  const [Adetails, SetAdetails] = useState({
    aadharnumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(voteContext);
  const { adminLogin } = context;

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (Adetails.aadharnumber.length !== 12) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    // Clear error and submit the form
    setError("");
    setLoading(true);
    try {
      const result = await adminLogin(Adetails.aadharnumber, Adetails.password);
      if (result.success) {
        localStorage.setItem("token", result.token);
        toast.success("Successfully authenticated...", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/admin");
      } else {
        toast.error(
          "Check your credentials , admin authentication failed....",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong , try again later", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    SetAdetails({ ...Adetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <section className="my-20 Adminlogin">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
          <div className="w-full rounded-lg shado md:mt-0 sm:max-w-md xl:p-0 :">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Admin's Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleAdminLogin}
              >
                <div>
                  <input
                    type="text"
                    name="aadharnumber"
                    id="aadharnumber"
                    value={Adetails.aadharnumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,12}$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Aadhar-Number"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={Adetails.password}
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 bg-gray-600 hover:bg-blue-600"
                >
                  Log In
                </button>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <ClipLoader size={20} color="#ffffff" />
                    <span className="text-white">
                      Logging in as administrator......
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
