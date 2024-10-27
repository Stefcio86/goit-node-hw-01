const { Command } = require("commander");
const contacts = require('./contacts');

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.log("Contact list:", allContacts);
        break;

      case "get":
        if (!id) throw new Error("Missing 'id' for 'get' action");
        const contact = await contacts.getContactById(id);
        if (!contact) {
          console.log("\x1B[31m Contact with the specified ID does not exist.");
        } else {
          console.log("Contact details:", contact);
        }
        break;

      case "add":
        if (!name || !email || !phone) throw new Error("Missing required fields (name, email, phone) for 'add' action");
        const newContact = await contacts.addContact(name, email, phone);
        console.log("Contact added:", newContact);
        break;

      case "remove":
        if (!id) throw new Error("Missing 'id' for 'remove' action");
        const remainingContacts = await contacts.removeContact(id);
        console.log("Contact delatted. Remaining contacts:", remainingContacts);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("\x1B[31m Error:", error.message);
  }
}

invokeAction(argv);
