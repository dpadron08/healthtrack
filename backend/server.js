const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.route.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const symptomRouter = require("./routes/symptom.route.js");
const matchRouter = require("./routes/match.route");
const treeRouter = require("./routes/tree.route");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", () => console.log("database connection failed"));
db.once("open", () => console.log("database connection successful"));

app.use("/api/users", userRouter);
app.use("/api/symptoms", symptomRouter);
app.use("/api/matches", matchRouter);
app.use("/api/tree", treeRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) =>
    res.json({ message: "Incorrect api call. Please do /api/{resource}" })
  );
}

app.listen(port, () => {
  console.log("App is running on port " + port);
});
