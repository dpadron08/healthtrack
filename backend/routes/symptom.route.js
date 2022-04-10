const express = require("express");
const symptomRouter = express.Router();
const {
  getSymptoms,
  setSymptoms,
  deleteSymptom,
  updateSymptom,
} = require("../controllers/symptom.controller");

symptomRouter.get("/", getSymptoms);
symptomRouter.post("/", setSymptoms);
symptomRouter.put("/:id", updateSymptom);
symptomRouter.delete("/:id", deleteSymptom);

module.exports = symptomRouter;
