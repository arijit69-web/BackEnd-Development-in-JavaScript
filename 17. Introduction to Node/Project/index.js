const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const BubbleSortString = `
class Solution {
    public static void bubbleSort(int a[], int n) {
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    swap(a, j, j + 1);
                }
            }
        }
    }

    public static void swap(int a[], int j, int k) {
        int temp = a[j];
        a[j] = a[k];
        a[k] = temp;

    }
}

`;

const HeapSortString = `
public class MinHeap {
    int[] harr;
    int capacity;
    int heap_size;

    MinHeap(int cap) {
        heap_size = 0;
        capacity = cap;
        harr = new int[cap];
    }

    int parent(int i) {
        return (i - 1) / 2;
    }

    int left(int i) {
        return (2 * i + 1);
    }

    int right(int i) {
        return (2 * i + 2);
    }

    int extractMin() {
        if (heap_size == 0)
            return -1;
        int ans = harr[0];
        harr[0] = harr[heap_size - 1];
        harr[heap_size - 1] = Integer.MAX_VALUE;
        heap_size--;
        int i = 0;
        while (2 * i + 1 < heap_size) {
            int lt = harr[left(i)];
            int rt = harr[right(i)];

            int large = -1;
            if (lt < rt) {
                large = 2 * i + 1;
            } else {
                large = 2 * i + 2;
            }

            if (harr[i] > harr[large]) {
                int temp = harr[i];
                harr[i] = harr[large];
                harr[large] = temp;
                i = large;
            } else {
                return ans;
            }
        }

        return ans;
    }

    void insertKey(int k) {
        if (heap_size == capacity)
            return;
        heap_size++;

        harr[heap_size - 1] = k;

        int i = heap_size - 1;

        while (i > 0) {
            int par = parent(i);
            if (harr[par] > harr[i]) {
                int temp = harr[par];
                harr[par] = harr[i];
                harr[i] = temp;
                i = par;

            } else {
                return;
            }
        }

    }

}

class Solution {
    public static void heapSort(int a[], int n) {
        MinHeap heap = new MinHeap(n);
        for (int i = 0; i < n; i++) {
            heap.insertKey(a[i]);
        }
        for (int i = 0; i < n; i++) {
            a[i] = heap.extractMin();
        }
    }

}
`;

const InsertionSortString = `
class Solution {
    public static void insertionSort(int a[], int n) {
        for (int i = 1; i < n; i++) {
            int hole = i;
            int value = a[i];
            while (hole > 0 && value < a[hole - 1]) {
                a[hole] = a[hole - 1];
                hole--;
            }
            a[hole] = value;
        }
    }

}
`;

const MergeSortString = `class Solution {
    int[] sortArr(int[] arr, int n) {
        sort(arr, 0, n - 1);
        return arr;

    }

    public static void sort(int arr[], int low, int end) {
        if (low < end) {
            int m = low + (end - low) / 2;
            sort(arr, low, m);
            sort(arr, m + 1, end);
            merge(arr, low, m, end);

        }
    }

    public static void merge(int[] arr, int low, int mid, int high) {

        int n1 = mid - low + 1;
        int n2 = high - mid;
        int L[] = new int[n1];
        int R[] = new int[n2];
        for (int i = 0; i < n1; i++) {
            L[i] = arr[i + low];
        }
        for (int i = 0; i < n2; i++) {
            R[i] = arr[mid + 1 + i];
        }
        int i = 0;
        int j = 0;
        int k = low;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i++];
            } else {
                arr[k] = R[j++];
            }
            k++;
        }
        while (i < n1) {
            arr[k] = L[i++];
            k++;

        }
        while (j < n2) {
            arr[k] = R[j++];
            k++;

        }

    }
}`;

const QuickSortString = `class Solution {
    int[] sortArr(int[] arr, int n) {
        sort(arr, 0, n - 1);
        return arr;

    }

    public static void sort(int[] arr, int low, int high) {
        if (low > high)
            return;
        int s = low;
        int e = high;
        int m = s + (e - s) / 2;
        int pivot = arr[m];

        while (s <= e) {
            while (arr[s] < pivot)
                s++;
            while (arr[e] > pivot)
                e--;
            if (s <= e) {
                int temp = arr[s];
                arr[s] = arr[e];
                arr[e] = temp;
                s++;
                e--;
            }
        }
        sort(arr, low, e);
        sort(arr, s, high);
    }
}`;

const SelectionSortString = `class Solution {
    public static void selectionSort(int a[], int n) {
        for (int i = 0; i < n; i++) {
            int imin = i;
            for (int j = i + 1; j < n; j++) {
                if (a[j] < a[imin]) {
                    imin = j;
                }
            }
            swap(a, imin, i);
        }
    }

    public static void swap(int a[], int j, int k) {
        int temp = a[j];
        a[j] = a[k];
        a[k] = temp;

    }
}`;

try {
  bot.start((ctx) => ctx.reply("Welcome to Arijit's Algorithm bot")); // /start

  bot.command("bubblesort", (ctx) => ctx.reply(BubbleSortString)); // /bubblesort
  bot.command("heapsort", (ctx) => ctx.reply(HeapSortString)); // /heapsort
  bot.command("insertionsort", (ctx) => ctx.reply(InsertionSortString)); // /insertionsort
  bot.command("mergesort", (ctx) => ctx.reply(MergeSortString)); // /mergesort
  bot.command("quicksort", (ctx) => ctx.reply(QuickSortString)); // /quicksort
  bot.command("selectionsort", (ctx) => ctx.reply(SelectionSortString)); // /selectionsort
  bot.on("sticker", (ctx) => ctx.reply("❤️"));

  bot.launch();
} catch {
  console.log("Invalid Command");
}
