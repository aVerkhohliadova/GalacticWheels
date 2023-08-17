export default class Order {
  constructor({ date, items, shippingInfo, paymentInfo }) {
    this.date = date;
    this.items = items;
    this.shippingInfo = shippingInfo;
    this.paymentInfo = paymentInfo;
  }
}