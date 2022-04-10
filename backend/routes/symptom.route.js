const express = require("express");
const symptomRouter = express.Router();
const {
  getSymptoms,
  setSymptoms,
  editSymptom,
  deleteSymptom,
} = require("../controllers/symptom.controller");

symptomRouter.get("/", getSymptoms);
symptomRouter.post("/", setSymptoms);
symptomRouter.put("/:id", editSymptom);
symptomRouter.delete("/:id", deleteSymptom);

module.exports = symptomRouter;
