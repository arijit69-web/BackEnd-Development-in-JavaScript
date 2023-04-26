let iPhone = {
  name: "Iphone 13 pro",
  price: 100000,
  descrption: "The new Apple Iphone 13 PRO.",
  rating: 4.8,

  display() {
    console.log("First Display", this);
  },
};

let MacBook = {
  name: "Macbook M2",
  price: 125000,
  descrption: "The new Apple MacBook M2.",
  rating: 4.9,

  display() {
    console.log("Second Display", this);
  },
};

iPhone.display(); // Calling display() function in the context of iPhone so this is refering to the calling context.
MacBook.display(); // Calling display() function in the context of MacBook so this is refering to the calling context.
console.log(this);
