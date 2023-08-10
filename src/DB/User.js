import Order from './Order';

export default class User {
  // Add functions specific to the ADT in it's own class, then call it from hooks in the page.
  // This is also where we will update data in firebase using apis from api/ folder
  constructor({ name, id, phone, email, password }) {
    this.name = name;
    this.id = id;
    this.phone = phone;
    this.email = email;
    this.orderHistory = []; // Initialize orderHistory as an empty array
  }

  addOrderToHistory(orderData) {
    const order = new Order(orderData);
    this.orderHistory.push(order);
  }

  // signup() {}
  //
  // login() {}
  //
  // session() {}
}
