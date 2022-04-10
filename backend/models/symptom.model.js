const mongoose = require("mongoose");
const symptomSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value for symptom"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Symptom", symptomSchema)