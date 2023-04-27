class Product {
  #name; // private variable
  #price; // private variable
  description;
  constructor(n, p, d) {
    this.#name = n;
    this.#price = p;
    this.description = d;
  }
  setName(n) {
    if (typeof n != "string") {
      console.log("Invalid Name!");
      return;
    }
    this.#name = n;
  }
  setPrice(p) {
    if (p < 0) {
      console.log("Invalid Price!");
      return;
    }
    this.#price = p;
  }
  getName() {
    return this.#name;
  }
  display() {
    console.log(this.#name, this.#price, this.description);
  }
}
const p = new Product("Bag", 100, "A cool bag.");
p.setName("New Bag");
console.log(p);
p.display();
p.setPrice(500);
p.display();
console.log("Name: ",p.getName());
