const Candidate = require("../Models/candidate");
const User = require("../Models/user");
const express = require("express");
const router = express.Router();

const {
  jwtMiddleware,
  generateToken,
} = require("../Middleware/JwtAuthentication");

// method to check if user is admin or not
const isAdmin = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// endpoint to check user is admin or not
router.post("/checkAdmin", async (req, res) => {
  try {
    let success = false;
    const { aadharnumber, password } = req.body;
    const user = await User.findOne({ aadharnumber });

    // if user is not available or entered password is not match by user's password -- return error
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Incorrect aadharNumber or Password" });
    }

    const payload = {
      id: user.id,
    };

    if (user.role === "admin") {
      // generate the token
      let token = await generateToken(payload);
      success = true;
      res.status(200).json({ success: success, token: token, user: user });
    } else {
      success = false;
      res.status(404).json("user is not have a admin role");
    }
  } catch (error) {
    res.status(500).json({ error: "Interal Server down" });
  }
});

// get admin info by using auth-token
router.get("/adminInfo", jwtMiddleware, async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await User.findById(adminId);
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Down" });
  }
});

// get all the candidates by their name , party
router.get("/getCandidates", async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "name party image age");
    if (!candidates)
      return res.status(404).json({ error: "Candidates not Found" });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Down" });
  }
});

// route for add a candidate
router.post("/addcandidate", async (req, res) => {
  try {
    let success = false;
    const data = req.body;
    const candidateData = new Candidate(data);
    // check if an image was uploaded
    if (req.file) {
      candidateData.image = req.file.filename;
    }

    const response = await candidateData.save();
    success = true;
    res.status(200).json({ success: success, response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server down" });
  }
});

// route for update a candidate
router.put("/update/:candidateId", async (req, res) => {
  try {
    const id = req.params.candidateId;
    const updateData = req.body;

    const response = await Candidate.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated documents
      runValidators: true, // Run Mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Down" });
  }
});

// route for delete a candidate
router.delete("/delete/:candidateId", async (req, res) => {
  try {
    const id = req.params.candidateId;
    const response = await Candidate.findByIdAndDelete(id);

    if (!response) {
      res.status(404).json({ error: "No candidate Found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Down" });
  }
});

// route for voting
router.post("/vote/:candidateId", jwtMiddleware, async (req, res) => {
  try {
    let success = false;
    const candidateId = req.params.candidateId; // extract the candidateId
    const userId = req.user.id; // extract the userId

    const candidate = await Candidate.findById(candidateId);
    if (!candidate)
      return res.status(404).json({ error: "Candidate Not Found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    // admin is prohabited for voting
    if (user.role == "admin")
      return res
        .status(401)
        .json({ success: success, data: "Admin are not allowed to vote!" });

    // one user can give one time votes
    if (user.isVoted)
      return res
        .status(404)
        .json({ success: success, data: "You are already voted" });

    // Update the Candidate document to record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Update the User document
    user.isVoted = true;
    await user.save();
    success = true;
    res.status(200).json({ success: success, data: "Successfully Voted- You can log-out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Down" });
  }
});

// route for voteCount
router.get("/voteCount", async (req, res) => {
  try {
    // find all the candidates and sort them by voteCount in decending order
    const candidates = await Candidate.find().sort({ count: "desc" });

    // map the candidated by their name and voteCount
    const record = candidates.map((data) => {
      return {
        party: data.party,
        voteCount: data.voteCount,
      };
    });

    res.status(200).json(record);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Found" });
  }
});

module.exports = router;
