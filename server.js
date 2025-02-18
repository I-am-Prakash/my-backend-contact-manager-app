const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
//Loads .env file contents into process.env by default.
// If DOTENV_KEY is present, it smartly attempts to load encrypted .env.vault file contents into process.env.

const app = express();

const PORT = process.env.PORT;

dbConnect();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Bhanu App running on PORT: ${PORT}`);
});
