class Product {
  #name; // private variable -> If u want to make the `name` variable `private` use the `#` symbol in front of the variable name. U have to declare it first over here.  U just can't directly use `this.name`. And whenever u r using the variable `name` inside the class u have to use it with `#`.
  #price; // private variable
  description;
  constructor(n, p, d) {
    this.#name = n;
    this.#price = p;
    this.description = d;
  }
  set setName(n) {
    // JS provides keywords for setters i.e. `set` -> to define a setter method to set the property value.
    if (typeof n != "string") {
      console.log("Invalid Name!");
      return;
    }
    this.#name = n;
  }
  set setPrice(p) {
    if (p < 0) {
      console.log("Invalid Price!");
      return;
    }
    this.#price = p;
  }
  get getName() {
    // JS provides keywords for getters i.e. `get` -> to define a getter method to get the property value.
    return this.#name;
  }
  display() {
    console.log(this.#name, this.#price, this.description);
  }
}
const p = new Product("Bag", 100, "A cool bag.");
p.setName = "New Bag"; // Now instead of calling this setName as a function we can use it or access it as a property.
console.log(p);
p.display();
p.setPrice = 500;
p.display();
console.log("Name: ", p.getName); // Now instead of calling this getName as a function we can use it or access it as a property.
