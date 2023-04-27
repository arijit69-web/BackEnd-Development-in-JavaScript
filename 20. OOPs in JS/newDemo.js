/*
class Product {
  name;
  price;
  description;
  display() {}
}
*/
/* The `new` keyword creates a completely new empty JS object. */

// const p = new Product(); // Product() is a constructor. It is calling the constructor of a class Product.

/* 
What is constructor?
Whenever u create an object of a class, the constructor is the first
function that actually gets called.
# Usecase of constructor?
- initialize the property of the object with some values.
- set up some connections.
Constructor is a special function. If u don't write the constructor
of yourself, JS takes the default constructor by default. In 
default constructor there is no logic.
*/

class Product {
  /* 
  Once u have assigned these values inside the constructor
  u don't need to mention these values name, price and description inside the class.
  When u do `this.name =`n;` | `this.price = p;` | `this.description = d;`
  a new key-value pair is getting assigned inside the object.
  `this` keyword is actually pointing to the `brand new plain empty object`.
  
  name;           
  price;
  description;

  If u don't have the constructor() and u only have just the properties
  then these properties get automatically assigned with the value undefined.
  */

  constructor(n, p, d) {
    /* 
    In JS constructors are created using this syntax constructor(){}
    Here `this` keyword will point to the same `brand new plain empty object`.
    */
    this.name = n;
    this.price = p;
    this.description = d;
    /*
    Constructor is a function and in a function, we generally return 
    something and here we are not returning anything.
    - return 10; -> Nothing will happen same answer will come out.
    - return "Arijit" -> Nothing will happen same answer will come out.
    Inside a constructor if u use a return keyword with a primitive
    then there is no effect it will just avoid it because 
    a constructor is meant to do something with an object.
    - return {}; Answer will come out as {} because constructors 
    are meant to return an object. So if u manually return an
    object it will think that this is the object that u want to return.
    - return {x : 10}; Answer will come out as {x : 10}
    - return this; If u don't return anything it is returning `this` by default or it is equivalent to saying `return this`.
    */
  }
  display() {}
}

const p = new Product("Bag", 100, "A cool bag."); // Here the calling context is the `brand new plain empty object` that is created by the `new` keyword.
console.log(p);

/*
Qs.Can u do constructor overloading in JS?
Ans: No, constructor overloading is not possible in JS.
*/
