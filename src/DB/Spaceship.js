/* eslint-disable camelcase */
export default class Spaceship {
  constructor({
    id,
    title,
    subtitle,
    description,
    type,
    price,
    available,
    rent_from,
    rent_to,
    src,
    rating,
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.type = type;
    this.price = price;
    this.available = available;
    this.rentFrom = rent_from;
    this.rentTo = rent_to;
    this.src = src;
    this.rating = rating;
  }
}
