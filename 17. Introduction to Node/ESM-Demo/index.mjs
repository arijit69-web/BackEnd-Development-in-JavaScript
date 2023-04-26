import searchingAlgo from "./searching.js"; // Here we have to mention the extension like `.js` while importing the package.
import { insertionsort } from "./sorting.mjs"; // -> Named Export

console.log(searchingAlgo.linearSearch([3, 2, 1, 5, 4, 23, 6], 23));

let arr = [3, 2, 1, 5, 4, 23, 6];
insertionsort(arr);
console.log(arr);

import BubbleSort from "./sorting.mjs"; // -> Default Export
arr = [99, 3, 2, 1, 5, 4, 23, 6];
BubbleSort(arr);
console.log(arr);

import { quicksort as qs } from "./sorting.mjs"; // -> Named Export
arr = [88, 3, 2, 1, 5, 4, 23, 6];
qs(arr);
console.log(arr);

import * as sorting from "./sorting.mjs";
arr = [55, 3, 2, 1, 5, 4, 23, 6];
sorting.quicksort(arr);
console.log(arr);
