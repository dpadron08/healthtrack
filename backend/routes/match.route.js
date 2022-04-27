const express = require("express");
const matchRouter = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getMatches } = require("../controllers/match.controller");

matchRouter.get("/", protect, getMatches);

module.exports = matchRouter;
