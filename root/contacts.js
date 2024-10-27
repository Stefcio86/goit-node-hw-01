const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  }
  async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  }
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  }
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(), 
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };