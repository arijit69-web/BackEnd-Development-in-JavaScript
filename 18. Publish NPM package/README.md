# Arijit-DSA Package in JS

## A Data Structures and Algorithms library for NodeJS

>Bad programmers worry about the code. Good programmers worry about data structures and algorithms.

This package contains templates for the following Data Structures and Algorithms:

**1. Data Structures**
- Heap
- Queue

**2. Algorithms**
- Binary Search
- Bubble Sort
- Merge Sort
- Quick Sort

## How to use the Algorithms package?

```
// import the package
const dsa = require("arijitdsa.js"); 

const arr = [7, 3, 1, 5, 8, 9, 0, 2]; 

// call the inbuilt sort function
dsa.Algorithms.BubbleSort(arr); 

console.log(arr);

```

## How to use the Data-Structures package?

```
// import the package
const dsa = require("arijitdsa.js");

// creating an object of the PriorityQueue and inserting the elements using inbuilt function
const pq = new dsa.DataStructures.PriorityQueue((a, b) => a> b);

pq.insert(9);
pq.insert(8);
pq.insert(1);
pq.insert(9);
pq.insert(5);
pq.insert(4);

pq.display();

```

