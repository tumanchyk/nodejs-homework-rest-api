const contacts = require('../models/contacts')
const { HttpError, ctrlWrapper } = require('../helpers')


const listContacts = async (req, res) => {
        const allContacts = await contacts.listContacts();
        res.json(allContacts)
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw HttpError(404, 'Not found');
    }
    res.json(oneContact)
}

const addContact = async (req, res) => {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact)
}

const removeContact = async (req, res) => {
    const { id } = req.params;
    const removedContact = await contacts.removeContact(id);
    if (!removedContact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Contact deleted' })
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, req.body);
    if (!updatedContact) {
      throw HttpError(404, 'Not found')
    }
    res.json(updatedContact)
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
}