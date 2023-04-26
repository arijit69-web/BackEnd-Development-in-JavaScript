const iPhone = {
  name: "iPhone",
  price: 100000,
  rating: 4.8,
  display: function () {
    let iPhoneRed = {
      name: "iPhone Red",
      price: 110000,
      print: function () {
        console.log("display()::print(): ", this);
      },
      print2: () => {
        /* 
           Qs. What is happening with the `this` keyword inside the arrow function?

           Ans: Inside arrow functions `this` keyword does not refers to the calling context.
                By default, inside an arrow function `this` is resolved lexically.
                Through lexical scoping, the 'this' keyword will be resolved.
                - print2() function doesnot know about `this` keyword. We'll go one step outside.
                Is this display() function actually having any idea about the `this` keyword? Yes
                display() function is the normal function not a arrow function so here u have an idea about `this` keyword that here `this`  actually points to the calling context.
                and here the calling context is the iPhone object.
               
        */

        console.log("display()::print()2: ", this);
      },
    };
    iPhoneRed.print();
    iPhoneRed.print2();
  },
  display2: () => {
    let iPhoneRed = {
      name: "iPhone Red",
      price: 110000,
      print: function () {
        console.log("display2()::print(): ", this);
      },
      print2: () => {
        /* 
           Qs.  If u make display() function as an arrow function, what will happen?

           Ans: print2() function doesnot know about `this` keyword. We'll go one step outside.
                Is the display2() function actually having any idea about `this` keyword? No, because it is an arrow function. We'll go one step outside.
                Now u go to the global context/global scope. Do u know about `this`? Yes
                In the global scope, u have a global `this` object which is an empty object {}. So it prints -> display2()::print()2:  {}
                **So we should not use the arrow functions occasionally.**

        */
        console.log("display2()::print()2: ", this);
      },
    };
    iPhoneRed.print();
    iPhoneRed.print2();
  },
};

iPhone.display();
iPhone.display2();
