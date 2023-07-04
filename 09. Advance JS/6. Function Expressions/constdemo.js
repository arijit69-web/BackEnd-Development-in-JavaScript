//console.log(x); TDZ
const x = 10;
// x = 9; throws an Error

const obj = {x: 10};
obj.y = 9; // throws no error as properties or items of object or array can be updated or removed.

//obj = {x: 11};//throws an Error : const stops reassignment but it doesnot stop updating the properties of arrays or objects





/*
The const declaration creates block-scoped constants, much like variables declared using the let keyword. 
The value of a constant can't be changed through reassignment (i.e. by using the assignment operator), and it can't be redeclared (i.e. through a variable declaration). 
However, if a constant is an object or array, its properties or items can be updated or removed.
*/