import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import voteContext from "../Context/vote/Votecontext";

const Usercomponent = () => {
  const context = useContext(voteContext);
  const { Users, displayUser, updatePassword } = context;
  const [password, SetPassword] = useState({
    currentpass: "",
    newpass: "",
  });
  const [isModalOpen, SetisModalOpen] = useState(false);

  // Method for open toggler
  const openToggler = (e) => {
    e.preventDefault();
    SetisModalOpen(true);
  };

  const closeModal = () => {
    SetisModalOpen(false);
  };

  const handleChange = (e) => {
    SetPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleUpdatePass = (e) => {
    e.preventDefault();
    updatePassword(password.currentpass, password.newpass);
    SetPassword({ currentpass: "", newpass: "" });
    SetisModalOpen(false);
  };

  useEffect(() => {
    displayUser();
  }, [displayUser]);

  return (
    <>
      <section className="p-14 userComponent body-font text-gray-600 h-[90vh]">
        <div className="mx-auto lg:w-4/6">
          <div className="mt-10 flex flex-col sm:flex-row">
            <div className="text-center sm:w-1/3 sm:py-8 sm:pr-8">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="title-font mt-4 text-lg font-medium text-white">
                  {Users.name}
                </h2>
              </div>
              <div className="updatePass my-4 flex justify-center items-center">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    openToggler(e);
                  }}
                >
                  <box-icon type="solid" name="edit"></box-icon>
                  Update Password
                </button>
              </div>
            </div>
            <div className="mt-4 border-t border-white pt-4 text-center sm:mt-0 sm:w-2/3 sm:border-l sm:border-t-0 sm:py-8 sm:pl-8 sm:text-left">
              <div className="output flex justify-center items-center">
                <div className="output-container">
                  <p className="mb-2 ">
                    <span className="font-semibold">Name : </span>
                    {Users.name}
                  </p>
                 
                  <p className="mb-2">
                    <span className="font-semibold">Email : </span>
                    {Users.email}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Phone : </span>
                    {Users.phone}
                  </p>
                
                  <p className="mb-2">
                    <span className="font-semibold">AadharNumber : </span>
                    {Users.aadharnumber}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Role- : </span>
                    {Users.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="button flex justify-center items-center">
            <Link to={"/vote"}>
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                vote now
              </button>
            </Link>
          </div>
        </div>

        {/* <!-- Main modal --> */}
        {isModalOpen && (
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className=" fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Your Password
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleUpdatePass}>
                    <div>
                      <input
                        type="text"
                        name="currentpass"
                        value={password.currentpass}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Old Password"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="newpass"
                        value={password.newpass}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Usercomponent;
