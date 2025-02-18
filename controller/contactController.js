// Controllers -> Replacement for => Request-handlers Logic- for Enpoints
// Create Functions -> takes (req and Res) => Performs the Business validations => Sends Res back to the Client.
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

//@desc Get method - to get all the contacts
//@route /api/contacts/
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.userID });
  res
    .status(200)
    .json({ message: `Hi Bhanu This is for getting All Contacts`, contacts });
});

//@desc Post method - to Create contact
//@route /api/contacts/
//@access private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Mandatory Fields should not be empty");
    // If throw => error -> HTML page => For Consistency Purpose => Use JSON => to Construct or structure error as per Business Needs -> Use Error handler
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.userID,
  });
  res.status(201).json({ contact });
});

//@desc Get method - to get contact based on ID
//@route /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.userID) {
    res.status(401);
    throw new Error("This user don't have permission to access this contact");
  }

  res.status(200).json({
    message: `Hi Bhanu This is to get the Contacts of id: ${req.params.id}`,
    contact,
  });
});

//@desc PUT method - to Update the contact based on ID
//@route /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.userID) {
    res.status(401);
    throw new Error("This user don't have permission to access this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contact._id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `Hi Bhanu This is to update the Contact of id: ${req.params.id}`,
    updatedContact,
  });
});

//@desc DELETE method - to delete the contact based on ID
//@route /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(contact._id);
  res.status(200).json({
    message: `Hi Bhanu This is for delete the Contacts of id: ${req.params.id}`,
    contact,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
