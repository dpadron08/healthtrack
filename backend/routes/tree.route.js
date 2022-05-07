const express = require("express");
const treeRouter = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getTree, updateTree } = require("../controllers/tree.controller");

treeRouter.get("/", protect, getTree);
treeRouter.put("/", protect, updateTree);

module.exports = treeRouter;
