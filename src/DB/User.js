export default class User {
  constructor({ displayName, id, phone, email, orderHistory = [], cart = [] }) {
    this.id = id;
    this.name = displayName;
    this.phone = phone;
    this.email = email;
    this.orderHistory = orderHistory;
    this.cart = cart;
  }
}
