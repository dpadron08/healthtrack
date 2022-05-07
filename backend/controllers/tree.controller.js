const Tree = require("../models/tree.model");
const User = require("../models/user.model");

// @desc    Get the current tree
// @route   GET /api/tree/
// @access  Private
const getTree = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "User id found in request was not found" });
    return;
  }
  var tree = await Tree.findOne({ user: req.user.id });
  // if no tree exists, create an empty JSON array representing no string
  // tree.find returns an array full of the matching trees. If none match,
  // will return a non-null empty array
  if (!tree || tree.length == 0) {
    // create a tree
    tree = await Tree.create({
      items: "[]",
      user: req.user.id,
    });
    if (!tree) {
      res.status(400).json({ message: "Could not create tree" });
      return;
    }
  }

  res.status(200).json({ tree });
};

// @desc    Set the current tree
// @route   PUT /api/tree/
// @access  Private
const updateTree = async (req, res) => {
  const tree = await Tree.findOne({ user: req.user.id });
  if (!tree) {
    res.status(400).json({ message: "Tree with given user id not found" });
    return;
  }
  if (!req.body.items) {
    res.status(400).json({
      message:
        "Please include a string representing the JSON for the family tree",
    });
    return;
  }

  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401).json({ message: "User not found in update symptom" });
    return;
  }

  // make sure the logged in user matches the tree user
  if (tree.user.toString() !== user.id) {
    res
      .status(401)
      .json({ message: "User not authorized to make this tree edit" });
    return;
  }
  const updatedTree = await Tree.findByIdAndUpdate(tree.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTree);
};

module.exports = {
  getTree,
  updateTree,
};
