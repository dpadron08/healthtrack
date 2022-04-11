const Symptom = require("../models/symptom.model")
const User = require("../models/user.model")

// @desc    Get a list of symptoms
// @route   GET /api/symptoms/
// @access  Private
const getSymptoms = async (req, res) => {
  const symptoms = await Symptom.find( {user: req.user.id} )
  res.status(200).json( symptoms );
};

// @desc    Submit symptoms
// @route   POST /api/symptoms/
// @access  Private
const setSymptoms = async (req, res) => {
  const symptom = await Symptom.create({
    text: req.body.text,
    user: req.user.id
  })
  if (symptom) {
    res.status(200).json(symptom);
  } else {
    res.status(400).json({message: "Could not create symptom"})
  }
};

// @desc    Edit a symptom
// @route   PUT /api/symptom/:id
// @access  Private
const updateSymptom = async (req, res) => {
  const symptom = await Symptom.findById(req.params.id)
  if (!symptom) {
    res.status(400).json({message: "Symptom id not found"})
    return
  }
  if (!req.body.text) {
    res.status(400).json("Please include a text with the symptom")
  }

  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401).json({message: "User not found in update symptom"})
    return
  }

  // make sure the logged in user matches the symptom user
  if (symptom.user.toString() !== user.id) {
    res.status(401).json({message: "User not authorized to make this edit"})
    return
  }

  const updatedSymptom = await Symptom.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedSymptom);
};

// @desc    Delete a symptom
// @route   DELETE /api/symptom/:id
// @access  Private
const deleteSymptom = async (req, res) => {
  const symptom = await Symptom.findById(req.params.id)
  if (!symptom) {
    res.status(400).json("No symptom of this id found to delete")
    return
  }

  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401).json({message: "User not found in delete symptom"})
    return
  }

  // make sure the logged in user matches the symptom user
  if (symptom.user.toString() !== user.id) {
    res.status(401).json({message: "User not authorized to make this edit"})
    return
  }

  await symptom.remove()
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getSymptoms,
  setSymptoms,
  updateSymptom,
  deleteSymptom,
};
