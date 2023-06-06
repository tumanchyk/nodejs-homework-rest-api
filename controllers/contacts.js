const {Contact} = require('../models/contact')
const { HttpError, ctrlWrapper } = require('../helpers')
 

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({owner}, '', {skip, limit}).populate();
  res.json(allContacts)
}

const getContactById = async (req, res) => {
  const { id } = req.params;
  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    throw HttpError(404);
  }
  res.json(oneContact)
}

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({owner, ...req.body});
  res.status(201).json(newContact)
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!updatedContact) {
    throw HttpError(404)
  }
  res.json(updatedContact)
}
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!updatedContact) {
    throw HttpError(404)
  }
  res.json(updatedContact)
}

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(404);
  }
  res.json({ message: 'Contact deleted' })
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateStatusContact)
}