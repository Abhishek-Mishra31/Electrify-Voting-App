import { React, useContext, useEffect } from "react";
import voteContext from "../Context/vote/Votecontext";
import { useNavigate } from "react-router-dom";

const Votecontent = () => {
  const context = useContext(voteContext);
  const { getCandidates, voting, candidates } = context;
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear("token");
    navigate("/");
  };

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  return (
    <>
      <div className="adminLogin flex justify-end p-8">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={handleLogOut}
        >
          Log-Out
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
        </button>
      </div>

      <section className="votecontent body-font">
        <div className="container px-5 py-4 mx-auto ">
          <div className="flex flex-wrap justify-around -m-4">
            {candidates.map((candidate, index) => {
              return (
                <div className="p-4 md:w-1/3" key={index}>
                  <div className="h-full border-2 border-gray-500 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="custom-height lg:h-36 md:h-32 w-full object-cover object-center"
                      src={candidate.image}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        <u>{candidate.name}</u>
                      </h1>
                      <div className="p-3 border rounded-lg shadow-md bg-purple-300">
                        <p className="text-lg font-semibold mb-2">
                          Party:
                          <span className="text-blue-500">
                            {candidate.party}
                          </span>
                        </p>
                        <p className="text-lg font-semibold mb-2">
                          Age:{" "}
                          <span className="text-blue-500">{candidate.age}</span>
                        </p>
                      </div>
                      <button
                        className="bg-gray-600 text-white border border-blue-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
                        onClick={(e) => {
                          e.preventDefault();
                          voting(candidate._id);
                        }}
                      >
                        Vote Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Votecontent;
