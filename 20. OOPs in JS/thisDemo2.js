const iPhone = {
  name: "iPhone",
  category: "Electronics",
  price: 10000,
  rating: 4.8,
  display: () => {
    /* Inside arrow functions `this` keyword does not refers to the calling context. */
    console.log(this);
  },
};

const MacBook = {
  name: "MacBook",
  category: "Electronics",
  price: 10000,
  rating: 4.8,
  display: function () {
    console.log(this);
  },
};

MacBook.display();
iPhone.display();
