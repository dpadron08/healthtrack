const express = require("express");
const symptomRouter = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getSymptoms,
  getSymptom,
  setSymptoms,
  deleteSymptom,
  updateSymptom,
} = require("../controllers/symptom.controller");

symptomRouter.get("/", protect, getSymptoms);
symptomRouter.get("/:id", protect, getSymptom);
symptomRouter.post("/", protect, setSymptoms);
symptomRouter.put("/:id", protect, updateSymptom);
symptomRouter.delete("/:id", protect, deleteSymptom);

module.exports = symptomRouter;
