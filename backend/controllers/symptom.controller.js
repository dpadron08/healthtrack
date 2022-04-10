const Symptom = require("../models/symptom.model")

// @desc    Get a list of symptoms
// @route   GET /api/symptoms/
// @access  Private
const getSymptoms = async (req, res) => {
  const symptoms = await Symptom.find()
  res.status(200).json( symptoms );
};

// @desc    Submit symptoms
// @route   POST /api/symptoms/
// @access  Private
const setSymptoms = async (req, res) => {
  console.log("Symptom request body text: " + req.body.text)
  const symptom = await Symptom.create({
    text: req.body.text
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
  await symptom.remove()
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getSymptoms,
  setSymptoms,
  updateSymptom,
  deleteSymptom,
};
