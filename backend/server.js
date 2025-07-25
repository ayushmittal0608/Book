const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes.js");

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect("mongodb+srv://Ayush_Mittal:Ayush%400608@cluster0.mj3oeww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

