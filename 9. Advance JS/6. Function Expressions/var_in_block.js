function fun() {
  var i = 5;
  while (i < 10) {
    var x = i; //Var inside a block : Var is used for function scope so it doesnot care about block, If no function scope then Outside Enclosing Scope and here Outside Enclosing Scope is fun() Scope so var y is scope of fun()
    i++;
  }
  console.log(x);
}
fun();
let i = 1;
console.log(y);
while (i < 5) {
  var y = 10; // Var is used for function scope so it doesnot care about block, If no function scope then Outside Enclosing Scope and here Outside Enclosing Scope is Global Scope so Var y is Global scope

  i++;
}
console.log(y);

/*Redeclaration is not allowed with Let, but it is allowed with Var
 let x = 9;  
 let x = 10; // throws a Error in Parse Phase only
 var y = 9;  
 var y = 10; //No Error
*/
