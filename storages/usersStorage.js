// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  getUsersByEmailOrName(searchTerm) {
    const users = this.getUsers();

    // First, find all users matching by email
    let matchedUsers = users.filter((u) => u.email === searchTerm);
    if (matchedUsers.length > 0) return matchedUsers;

    // If none by email, find all users matching by last name
    matchedUsers = users.filter((u) => u.lastName === searchTerm);
    if (matchedUsers.length > 0) return matchedUsers;

    // If none by last name, find all users matching by first name
    matchedUsers = users.filter((u) => u.firstName === searchTerm);
    if (matchedUsers.length > 0) return matchedUsers;

    // If no match found
    return [];
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
