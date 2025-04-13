import React, { useCallback, useState } from "react";
import VoteContext from "./Votecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Votestate = (props) => {
  const candidate = [];
  const vote = [];
  const user = [];
  const admin = [];
  const host = process.env.REACT_APP_API_URL; // this is production host url
  const localHost = "http://localhost:5001"; // this is local host url

  // user SignUp
  const userSignUp = async (
    name,
    email,
    aadharnumber,
    phone,
    password,
    role
  ) => {
    const signUpUrl = `${host}/user/signup`;
    const response = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        aadharnumber,
        phone,
        password,
        role,
      }),
    });
    const result = await response.json();
    return result;
  };

  // User Login
  const userLogin = async (aadharnumber, password) => {
    const loginUrl = `${host}/user/login`;
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ aadharnumber, password }),
    });
    const result = await response.json();
    return result;
  };

  // display user profile
  const displayUser = useCallback(async () => {
    const userUrl = `${host}/user/profile`;
    const token = localStorage.getItem("token");
    const response = await fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    SetUsers(result.user);
  }, [host]);

  // update user's password
  const updatePassword = async (currentpass, newpass) => {
    const updateUrl = `${host}/user/update`;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ currentpass, newpass }),
      });
      const result = await response.json();
      if (result.success === true) {
        toast.success("Successfully Password Changed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error("There is problem with Server , Kindly try again!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Something wrong with Server!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  // display all the candidates
  const getCandidates = useCallback(async () => {
    const candidateUrl = `${host}/candidate/getCandidates`;
    const response = await fetch(candidateUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    Setcandidates(result);
  }, [host]);

  // handle the adminLogin
  const adminLogin = async (aadharnumber, password) => {
    const adminLoginUrl = `${host}/candidate/checkAdmin`;
    const response = await fetch(adminLoginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ aadharnumber, password }),
    });
    const result = await response.json();
    return result;
  };

  // enroll new candidate
  const enrollCandidate = async (name, age, image, party) => {
    const enrollUrl = `${host}/candidate/addcandidate`;
    const response = await fetch(enrollUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, age, image, party }),
    });
    const result = await response.json();
    return result;
  };

  // update the candidate
  const editCandidates = async (name, age, party, candidateId) => {
    const updateUrl = `${host}/candidate/update/${candidateId}`;
    // eslint-disable-next-line
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        party,
      }),
    });
    // Logic to render updated notes on our page
    let newCandidate = JSON.parse(JSON.stringify(candidates));
    for (let index = 0; index < newCandidate.length; index++) {
      const element = newCandidate[index];
      if (element._id === candidateId) {
        newCandidate[index].name = name;
        newCandidate[index].age = age;
        newCandidate[index].party = party;
        break;
      }
    }
    Setcandidates(newCandidate);
  };

  // delete the candidate
  const deleteCandidate = async (candidateId) => {
    const deleteUrl = `${host}/candidate/delete/${candidateId}`;
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    // eslint-disable-next-line
    const result = await response.json();
    const newCandidate = candidates.filter((data) => {
      return data._id !== candidateId;
    });
    Setcandidates(newCandidate);
  };

  // get admin info
  const getAdminInfo = async () => {
    const adminUrl = `${host}/candidate/adminInfo`;
    const token = localStorage.getItem("token");
    const response = await fetch(adminUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    SetAdmins(result.admin);
  };

  // endpoint for voting
  const voting = async (candidateId) => {
    const votingUrl = `${host}/candidate/vote/${candidateId}`;
    const token = localStorage.getItem("token");
    const response = await fetch(votingUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const result = await response.json();

    if (result.success) {
      toast.success(result.data, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      toast.error(result.data, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  // get election result
  const getCount = async () => {
    const countUrl = `${host}/candidate/voteCount`;
    const response = await fetch(countUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    setVotes(result);
  };

  // contactUs Handler
  const sendContact = async (name, email, message) => {
    const contactUrl = `${host}/contact`;
    const response = await fetch(contactUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await response.json();
    return result;
  };

  // here all are states of candidates and users
  const [candidates, Setcandidates] = useState(candidate);
  const [votes, setVotes] = useState(vote);
  const [Users, SetUsers] = useState(user);
  const [admins, SetAdmins] = useState(admin);

  return (
    <VoteContext.Provider
      value={{
        candidates,
        votes,
        Users,
        admins,
        Setcandidates,
        getCandidates,
        enrollCandidate,
        editCandidates,
        deleteCandidate,
        getCount,
        userSignUp,
        userLogin,
        displayUser,
        updatePassword,
        voting,
        adminLogin,
        getAdminInfo,
        sendContact,
      }}
    >
      {props.children}
    </VoteContext.Provider>
  );
};

export default Votestate;
