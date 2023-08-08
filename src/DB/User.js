export default class User {
  // Add functions specific to the ADT in it's own class, then call it from hooks in the page.
  // This is also where we will update data in firebase using apis from api/ folder
  constructor({ name, id }) {
    this.name = name;
    this.id = id;
  }

  // signup() {}
  //
  // login() {}
  //
  // session() {}
}
