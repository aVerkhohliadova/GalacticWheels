export default class Spaceship {
  constructor({
    id,
    title,
    subtitle,
    description,
    type,
    price,
    available,
    // eslint-disable-next-line camelcase
    rent_from,
    // eslint-disable-next-line camelcase
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
    // eslint-disable-next-line camelcase
    this.rentFrom = rent_from;
    // eslint-disable-next-line camelcase
    this.rentTo = rent_to;
    this.src = src;
    this.rating = rating;
  }
}
