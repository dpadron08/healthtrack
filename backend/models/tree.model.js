const mongoose = require("mongoose");
const treeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, strictQuery: false }
);

module.exports = mongoose.model("Tree", treeSchema);
