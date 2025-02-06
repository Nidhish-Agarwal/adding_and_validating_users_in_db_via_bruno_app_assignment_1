const express = require("express");
const { resolve } = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./user.model.js");
const app = express();
const port = 3010;
const db_url =
  "mongodb+srv://Nidhish_Agarwal:Nidhish64364488@cluster0.tqv0w.mongodb.net/adding_validating_users";

app.use(express.static("static"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((er) => {
    console.log("Failed to connect", er.message);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/add-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const response = await userModel.create({
      username,
      email,
      password: hashedPass,
    });
    return res
      .status(201)
      .send({ message: "Sucessfully created the user", data: response });
  } catch (er) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: er.message });
  }
});
