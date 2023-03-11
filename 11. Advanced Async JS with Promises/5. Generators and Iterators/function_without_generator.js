function fetchNextElement() {
  console.log("I am inside the generator function:1st line");
  console.log("I am inside the generator function:2nd line");
  console.log("somewhere in the middle");
}

const iter = fetchNextElement();
