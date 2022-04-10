

// @desc    Get a list of symptoms
// @route   GET /api/symptoms/
// @access  Private
const getSymptoms = async (req, res) => {
    res.status(200).json({message: "Seeing symptoms"})
}

// @desc    Submit symptoms
// @route   POST /api/symptoms/
// @access  Private
const setSymptoms = async (req, res) => {
    res.status(200).json({message: "Setting symptoms"})
}

// @desc    Edit a symptom
// @route   PUT /api/symptom/:id
// @access  Private
const editSymptom = async (req, res) => {
    res.status(200).json({message: "Editing a symptom"})
}

// @desc    Delete a symptom
// @route   DELETE /api/symptom/:id
// @access  Private
const deleteSymptom = async (req, res) => {
    res.status(200).json({message: "Deleting a symptom"})
}

module.exports = {
    getSymptoms,
    setSymptoms,
    editSymptom,
    deleteSymptom,
}