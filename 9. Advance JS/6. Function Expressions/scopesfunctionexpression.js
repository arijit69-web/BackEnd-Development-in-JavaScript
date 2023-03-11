const f = function fun() {
  //This function is only accessible via variable f and it is not accessible outside f and it is bound to the scope of f only
  console.log("How much fun????");
};

console.log(f()); //A function that lacks an explicit return statement will return undefined
// fun();//Throws an Error
