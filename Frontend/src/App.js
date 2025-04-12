import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Usercomponent from "./components/Usercomponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Votecontent from "./components/Votecontent";
import Contactus from "./components/Contactus";
import About from "./components/About";
import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Votestate from "./Context/vote/Votestate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <Votestate>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/user" element={<Usercomponent />} />
              <Route exact path="/vote" element={<Votecontent />} />
              <Route exact path="/contactus" element={<Contactus />} />
              <Route exact path="/aboutus" element={<About />} />
              <Route exact path="/AdminLogin" element={<AdminLogin />} />
              <Route exact path="/admin/*" element={<AdminLayout />} />
            </Routes>
            <ToastContainer />
            <Footer />
          </Router>
        </Votestate>
      </div>
    </>
  );
}

export default App;
