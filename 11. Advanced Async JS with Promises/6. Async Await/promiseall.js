function download(url, time) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from", url);
    setTimeout(function down() {
      console.log("Downloading completed");
      const content = "ABCDEF"; // assume dummy download content
      if (time > 1000) {
        reject("err");
      } else resolve(content);
    }, time);
  });
}

const p1 = download("www.abc1.com", 5000);
const p2 = download("www.abc2.com", 1000);
const p3 = download("www.abc3.com", 3000);
Promise.all([p1, p2, p3]).then(function fullfillHandler(values) {
  console.log(values);
});

/*

---------------EXPLANATION---------------

We have to repeat this process again and again:
1. Download some new data
2. Write that data in the file
3. Upload that file
> If we have 3 steps like above then we have to do a lot of await await await await await await....
> Not a very good syntax as it will become an async await hell type thing

> If you have multiple tasks that are independent of each other that means 3 parallel independent tasks
> It's not good that u first complete download 1 then u start download 2 and then u start download 3
> Instead u can use Promise.all([p1, p2, p3])

> The Promise.all() static method takes an iterable of promises
as input and returns a single Promise. This returned promise
fulfills when all of the input's promises fulfill 
(including when an empty iterable is passed), with an array
of the fulfillment values. It rejects when any of the input's
promises rejects, with this first rejection reason.

> Parallelly start all the 3 downloads together and wrap all of the promises
inside the Promise.all().This Promise.all() wraps all of the promises into a bigger promise in which u can have .then() and .then() of Promise.all() gives u a fulfillment handler.This fulfillment handler gives 
u a values property that is an array of all the promises that u actually started

> The bigger promise of Promise.all() is resolved when all of the promises p1,p2,p3 are fulfilled

> The Promise.allSettled() static method takes an iterable of 
promises as input and returns a single Promise. This returned
promise fulfills when all of the input's promises settle 
(including when an empty iterable is passed), with an array
of objects that describe the outcome of each promise.

> The Promise.any() static method takes an iterable of promises
as input and returns a single Promise. This returned promise
fulfills when any of the input's promises fulfills, with 
this first fulfillment value. It rejects when all of the
input's promises reject (including when an empty iterable is
passed), with an AggregateError containing an array of 
rejection reasons.

> The Promise.race() static method takes an iterable of 
promises as input and returns a single Promise. This 
returned promise settles with the eventual state of the first
promise that settles.

*/
