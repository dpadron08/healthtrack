const mongoose = require("mongoose");
const symptomSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value for symptom"],
    },
  },
  { timestamps: true, strictQuery: false }
);

module.exports = mongoose.model("Symptom", symptomSchema);
