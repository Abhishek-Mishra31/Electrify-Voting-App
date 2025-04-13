import { React, useContext, useEffect, useState } from "react";
import voteContext from "../Context/vote/Votecontext";
const AdminPNG = require("../Public/admin2.png");

const Dashboard = () => {
  const context = useContext(voteContext);
  const { getAdminInfo, admins } = context;

  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <>
      <section className="Dashboard flex my-8 justify-center align-center">
        <div className="w-full max-w-sm rounded-lg shadow bg-gray-500">
          <h1 className="text-white my-5">Admin's Info</h1>
          <div className="dashboard-box flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={AdminPNG}
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {admins?.name}
            </h5>
            <p className="mb-2 text-black">
              <span className="font-semibold">Phone : </span>
              {admins?.phone}
            </p>
            <p className="mb-2 text-black">
              <span className="font-semibold">email : </span>
              {admins?.email}
            </p>
            <p className="mb-2 text-black">
              <span className="font-semibold">Role : </span>
              {admins?.role}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
