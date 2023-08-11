// import { COLLECTION, add, update } from "../api/firestore";
import Order from "./Order";

export default class User {
  constructor({ displayName, id, phone, email, orderHistory = [], cart = [] }) {
    this.id = id;
    this.name = displayName;
    this.phone = phone;
    this.email = email;
    this.orderHistory = orderHistory;
    this.cart = cart;
  }

  addOrderToHistory(orderData) {
    const order = new Order(orderData);
    this.orderHistory.push(order);
    // this._update();
  }

  // async _add() {
  //   const id = await add(COLLECTION.USERS, this);
  //   this.id = id;
  // }
  //
  // _update() {
  //   update(COLLECTION.USERS, this.id, this);
  // }
}
