// Generate the random numbers from the range 0 to max-1
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// A function that returning a promise
function createPromiseWithTimeout() {
  return new Promise(function executor(resolve, reject) {
    console.log("Entering the executor callback in the promise constructor");
    setTimeout(function () {
      let num = getRandomInt(10);
      if (num % 2 == 0) {
        // if the random number is even we fulfill
        resolve(num);
      } else {
        // if the random number is odd we reject
        reject(num);
      }
    }, 1000);
    console.log("Exiting the executor callback in the promise constructor");
  });
}
console.log("Starting....");
const p = createPromiseWithTimeout(); // Consuming the promise
console.log("We are now waiting for the promise to complete");
console.log("Currently my promise object is like ... ", p);
p.then(
  function fulfillHandler(value) {
    console.log("Inside fulfill handler with value", value);
  },
  function rejectionHandler(value) {
    console.log("Inside rejection handler with value", value);
  }
);

/*
.then() have 2 functions 
1.fulfillHandler(value)
2.rejectionHandler(value)

Once the  promise is either fulfilled or rejected,based on whatever states u go to 
one of the callbacks fulfillHandler(value) or rejectionHandler(value)  is going to get executed

OUTPUT:
Starting....
Entering the executor callback in the promise constructor       [Enter the executor callback | Started the timer]
Exitting the executor callback in the promise constructor       [Exit from the executor callback]
We are now waiting for the promise to complete
Currently my promise object is like ...  Promise { <pending> }  [Currently Promise is in pending state]
Inside fulfill handler with value 8                             [After `10 secs` it generated a random value 8,Random number generated is even so we resolve(), therefore it entered into the fulfillHandler(value)]

*/
