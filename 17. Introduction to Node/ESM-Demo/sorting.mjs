export function insertionsort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currElement = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > currElement) {
      arr[j + 1] = arr[j]; // shifting the element to the right index
      j--;
    }
    arr[j + 1] = currElement;
  }
}

/* Default Export */

export default function bubblesort(arr) {
  let n = arr.length;
  // this function applied adjacent comparisons and immediate swaps with adjacent element
  for (let i = 0; i < n - 1; i++) {
    let isSwapped = false;
    // we just need n-1 iterations because after than we will be only left with smallest element
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSwapped = true;
      }
    }
    if (isSwapped == false) break;
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function partition(arr, pivotIndex, L, R) {
  /**
   * Time: O(n)
   * Space: O(1)
   */
  let pivotElement = arr[pivotIndex];
  let i = L - 1;
  // swap the pivot on the last index
  swap(arr, pivotIndex, R);
  let j = L;
  while (j <= R - 1) {
    if (arr[j] <= pivotElement) {
      i++;
      swap(arr, i, j);
    }
    j++;
  }
  swap(arr, i + 1, R);
  return i + 1;
}
function pickRandomPivot(l, r) {
  return Math.floor(Math.random() * (r - l) + l);
}
function f(arr, l, r) {
  if (l >= r) return;
  let pivotIndex = pickRandomPivot(l, r);
  let m = partition(arr, pivotIndex, l, r);
  f(arr, l, m - 1);
  f(arr, m + 1, r);
}

export function quicksort(arr) {
  return f(arr, 0, arr.length - 1);
}
