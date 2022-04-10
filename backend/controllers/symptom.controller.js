const Symptom = require("../models/symptom.model")

// @desc    Get a list of symptoms
// @route   GET /api/symptoms/
// @access  Private
const getSymptoms = async (req, res) => {
  res.status(200).json({ message: "Seeing symptoms" });
};

// @desc    Submit symptoms
// @route   POST /api/symptoms/
// @access  Private
const setSymptoms = async (req, res) => {
  res.status(200).json({ message: "Setting symptoms" });
};

// @desc    Edit a symptom
// @route   PUT /api/symptom/:id
// @access  Private
const updateSymptom = async (req, res) => {
  res.status(200).json({ message: "Updating a symptom" });
};

// @desc    Delete a symptom
// @route   DELETE /api/symptom/:id
// @access  Private
const deleteSymptom = async (req, res) => {
  res.status(200).json({ message: "Deleting a symptom" });
};

module.exports = {
  getSymptoms,
  setSymptoms,
  updateSymptom,
  deleteSymptom,
};
