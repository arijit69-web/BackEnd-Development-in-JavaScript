const dsa = require("arijitdsa.js");

const arr = [7, 3, 1, 5, 8, 9, 0, 2];

dsa.Algorithms.BubbleSort(arr);

console.log(arr);

const pq = new dsa.DataStructures.PriorityQueue((a, b) => a > b);

pq.insert(9);
pq.insert(8);
pq.insert(1);
pq.insert(9);
pq.insert(5);
pq.insert(4);

console.log(pq.get());
pq.display();
