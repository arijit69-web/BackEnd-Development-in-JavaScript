/*
In NodeJS, require() is a built-in function to include 
external modules that exist in separate files. require() 
statement basically reads a JavaScript file, executes it, 
and then proceeds to return the export object. require() 
statement not only allows to add built-in core NodeJS 
modules but also community-based and local modules.
*/

/* Syntax 1 */
const searchFuncations = require("./searching");
console.log(searchFuncations.linearSearch([3, 2, 1, 5, 4, 23, 6], 23));

/* Syntax 2 */
const { linearSearch, binarySearch } = require("./searching");
console.log(linearSearch([3, 2, 1, 5, 4, 23, 6], 3));

const { bubblesort, insertionsort } = require("./sorting"); // -> named export

const QuickSort = require("./quicksort"); //-> default export

let arr = [5, 4, 3, 2, 1];
QuickSort(arr);
console.log(arr);

arr = [6, 5, 4, 3, 2, 1];
bubblesort(arr);
console.log(arr);
