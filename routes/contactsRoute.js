//Separate Routes => to not mess server up with logics -> Sepeareted Routes logic
// By creating separate files for each route => and => use the files as Middlewares
const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
