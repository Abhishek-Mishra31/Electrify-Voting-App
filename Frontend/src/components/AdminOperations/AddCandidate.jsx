import React, { useContext, useState } from "react";
import voteContext from "../../Context/vote/Votecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCandidate = () => {
  const [details, Setdetails] = useState({
    name: "",
    age: "",
    image: "",
    party: "",
  });

  const context = useContext(voteContext);
  const { enrollCandidate } = context;

  const handleChange = (e) => {
    Setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const addCandidate = async (e) => {
    try {
      e.preventDefault();
      const result = await enrollCandidate(
        details.name,
        details.age,
        details.image,
        details.party
      );
      if (result.success) {
        toast.success("Candidate added successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error("There is problem with enrollment!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
      Setdetails({ name: "", age: "", imageurl: "", party: "" });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="addcandidateBox">
      <form className="mx-auto max-w-md my-28" onSubmit={addCandidate}>
        <div className="group relative z-0 mb-5 w-full  ">
          <input
            type="text"
            name="name"
            id="name"
            value={details.name ?? ""}
            onChange={handleChange}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-white dark:text-white dark:focus:border-blue-500"
            placeholder="Candidates's Name"
            required
          />
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="number"
            name="age"
            id="age"
            value={details.age ?? ""}
            onChange={handleChange}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-white dark:text-white dark:focus:border-blue-500"
            placeholder="Candidates's Age"
            required
          />
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="image"
            id="image"
            value={details.image ?? ""}
            onChange={handleChange}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-white dark:text-white dark:focus:border-blue-500"
            placeholder="Candidates's Image"
            required
          />
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="party"
            id="party"
            value={details.party ?? ""}
            onChange={handleChange}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-white dark:text-white dark:focus:border-blue-500"
            placeholder="Candidates's Party"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enroll Candidate
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;
