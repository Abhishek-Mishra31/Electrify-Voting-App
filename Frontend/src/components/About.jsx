import React from "react";
import Navbar from "./Navbar";
import missionsvg from "../Public/mission_svg.svg";
import tech_stack from "../Public/tech_stack.svg";
import user_admin from "../Public/user_admin.svg";
import works from "../Public/works.svg";

const AboutUs = () => (
  <>
    <Navbar />
    <div className="aboutUs text-white px-4 py-10 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <header className="text-center pb-10 border-b border-gray-300">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-2 text-lg text-gray-300">
          Learn more about our mission and works
        </p>
      </header>

      <div className="grid gap-10 mt-10">
        <section className="flex flex-col md:flex-row items-center gap-6 bg-white text-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold font-mono">Our Mission</h2>
            <p className="mt-4">
              Our mission is to provide a transparent, secure, and user-friendly
              platform for online voting, ensuring that every vote counts.
            </p>
          </div>
          <div className="hidden md:block md:w-1/2 text-center">
            <img src={missionsvg} alt="Mission" className="w-64 mx-auto" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center gap-6 bg-white text-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold font-mono">
              User and Admin Sections
            </h2>
            <p className="mt-4">
              Users can participate in voting, while administrators manage polls
              and ensure the integrity of the process. Admins do not vote to
              remain impartial.
            </p>
          </div>
          <div className="hidden md:block md:w-1/2 text-center">
            <img
              src={user_admin}
              alt="Admin and Users"
              className="w-64 mx-auto"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-6 bg-white text-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold font-mono">
              Technology Stack
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>React.js for the frontend</li>
              <li>Node.js and Express for the backend</li>
              <li>MongoDB for the database</li>
              <li>JWT(Auth) for authentication</li>
              <li>Bcrypt for password hashing</li>
              <li>Tailwind CSS for styling</li>
              <li>Chart.js for Polling</li>
            </ul>
          </div>
          <div className="hidden md:block md:w-1/2 text-center">
            <img src={tech_stack} alt="Tech Stack" className="w-64 mx-auto" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center gap-6 bg-white text-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold font-mono">How It Works</h2>
            <ol className="mt-4 list-decimal list-inside space-y-2">
              <li>Sign up or log in to your account</li>
              <li>View available candidates</li>
              <li>Cast your vote securely</li>
              <li>Optionally update your password</li>
              <li>Enjoy a smooth voting experience</li>
            </ol>
          </div>
          <div className="hidden md:block md:w-1/2 text-center">
            <img src={works} alt="How It Works" className="w-64 mx-auto" />
          </div>
        </section>
      </div>
    </div>
  </>
);

export default AboutUs;
