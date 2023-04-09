function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let arr = [1, 2, 3, 4, 5];
let i = 0;
let j = arr.length - 1;

while (i <= j) {
  swap(arr, i, j);
  i = i + 1;
  j = j - 1;
}
console.log(arr);
