const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(express.static("public"));
// app.use("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
try {
  mongoose.connect(
    "mongodb+srv://harsh:harsh131120@cluster0.qvbje4n.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "users" }
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    ("MongoDB connected successfully");
  });
} catch (e) {
  console.log("error in connecting to mongoose");
  console.log("error:", e);
}
app.listen(3002, () => console.log("Server running on port 3002"));
