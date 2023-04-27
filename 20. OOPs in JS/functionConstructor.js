function Product(n, p, d) {
  this.name = n;
  this.price = p;
  this.description = d;

  this.display = function () {
    console.log(this.name, this.price);
  };

  /*
Case 1:
In this function, I am not returning anything.

When u don't return anything from a function it technically returns
undefined. But since it is technically used as a constructor
with a `new` keyword that's why if u don't return anything 
it is equivalent to saying `return this`.
- return 10; -> Nothing will happen same answer will come out.
- return "Arijit" -> Nothing will happen same answer will come out.
- return {}; Answer will come out as {} because constructors are
meant to return an object and here function works as a constructor.
*/
}
const p = new Product("Bag", 100, "A cool new bag.");
console.log(p); // We are getting the same output that we are getting in the Product class.
// Whatever u are doing with a class u can achieve with a function. Classes are just a wrap-over function.
p.display();

const q = Product("Bag2", 200, "A cool new bag2.");
console.log(q);
/*
Case 2: 
But if u call this function without the `new` keyword i.e.:**
`const q = Product("Bag2", 200, "A cool new bag2.");`
Now you will get `undefined` over here -> `console.log(q);` 
Since we are not using the `new` keyword it is no more a 
function constructor. It will not throw an error because 
here `this` is going to be resolved in a lexical scoping 
fashion and there is Global `this` in NodeJS and inside the 
Global `this` we are actually assigning all the values of 
name, price, and description.
If u do `return this` inside the function Product(n, p, d){} for the Case 2
- return this; -> It is going to return u the whole Global object
and inside that Global Object u have assigned all the values of 
name, price, and description.
*/

/*
Moral: You can do everything with a function that u can do with classes in JS.
*/
