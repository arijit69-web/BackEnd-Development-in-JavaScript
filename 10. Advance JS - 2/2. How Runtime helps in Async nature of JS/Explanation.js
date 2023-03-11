//Native piece of JS code
function timeConsumingByLoop() {
  console.log("loop starts");
  for (let i = 0; i < 1000000000; i++) {
    // some task
  }
  console.log("loop ends");
}
function timeConsumingByRuntimeFeature() {
  console.log("Starting timer");
  setTimeout(function exec() {
    
  console.log("Completed the timer");


  }, 5000); // 5 sec timer
}
console.log("Hi");
timeConsumingByLoop();
timeConsumingByRuntimeFeature();
timeConsumingByLoop();
console.log("Bye");

/*

print -> Hi @ line no. 18
Native piece of JS code - Whenever u start executing a native piece of JS code - Function call @ line no. 19.
The moment u make a function call a new entry will be made timeConsumingByLoop() inside the stack.

Once the entry is made go to line no. 2.

print -> loop starts @ line no. 3.

for loop will take 2-3 secs to execute as for loop is a native piece of JS code. 
Till the time for loop is getting executed, JS will wait here at line no. 4 and not move forward as JS code is synchronous in nature.

print -> loop ends @ line no. 7.

timeConsumingByLoop() done so remove it from the stack.

go to line no. 20.

Function call @ line no. 20 - The moment u make a function call a new entry will be made timeConsumingByRuntimeFeature() inside the stack.

print -> Starting timer @ line no. 10.

At line no. 11 setTimeout - Not a JS native feature. Feature is given to JS by Runtime.

JS will notify the Runtime to start a timer of 5 sec-Execute it and JS will going to come back later on after finish executing all the JS native codes and then going to execute the exec() function.

JS after notifying the Runtime, immediately comes back @ line no. 17 which is the end of the function timeConsumingByRuntimeFeature().

Runtime : [Behind the scene a timer will start inside the Runtime which is a separate thing from JS]

At line no. 17 timeConsumingByRuntimeFeature() ends so remove it from the stack.

go to line no. 21

Function call @ line no. 21 - The moment u make a function call a new entry will be made timeConsumingByLoop() inside the stack.

Runtime : [Behind the scene timer is still running]

Once the entry is made go to line no. 2.

print -> loop starts @ line no. 3.

Again a blocking piece of code i.e. for loop @ line no. 4.

Now there can be 2 cases:

Case 1: Either this for loop @ line no. 4 completes in less than 5 secs.

Case 2: Or the for loop @ line no. 4 completes in more than 5 secs.

Consider Case 1 :
            When for loop @ line no. 4 completes in less than 5 secs
            print -> loop ends @ line no. 7
            timeConsumingByLoop() done so remove it from the stack
            Timer is going to complete.
Consider Case 2:
            for loop @ line no. 4 takes 10 secs to execute
            But Timer will end in 5 secs
            We will never pause/stop a synchronous piece of JS native code execution/We will never pause something that is native to JS.
            Even though the Timer will end in 5 secs, it was a Runtime feature. JS will not give it priority.
            If a synchronous piece of code is executing, JS will never break it and JS will keep on executing the synchronous code.
            JS for loop @ line no. 4 will not stop for RunTime Timer.

If the Runtime task is done send the callback function exec() @ line no. 11 inside the Event Queue to keep a track and keep on executing the JS for loop @ line no. 4

After 10 secs for loop ends

print -> loop ends @ line no. 7

timeConsumingByLoop() done so remove it from the stack

go to line no. 22

print -> Bye @ line no. 22

At last, start executing the function exec() from Event Queue

Event Loop - It keeps on checking [infinitely] weather the stack is empty or not and no global code is left for execution.

[**imp]Whatever callbacks are present in the Event Queue cannot execute immediately.

[**imp]Callbacks present in the event queue can only execute if and only if there is nothing in the stack [stack is empty] & there is no piece of global scope left to execute [ no function calls or no print statements in global scope etc.]

Event loop is going to pick one callback function from the Event Queue and push it into the stack and stack now starts it's execution.

If there is any other callback functions in the Event Queue it will keep on waiting in the Event Queue unless and until the stack have completed it's previous callback function's execution.

Now exec() function will execute and print -> Completed the timer @ line no. 13.

At line no. 16 exec() ends so remove it from the stack.

This is how JS handles async. and sync. code.

Due to this Event Loop and Event Queue JS code become Non Blocking for Runtime features.


OUTPUT :
Hi
loop starts
loop ends
Starting timer
loop starts   
loop ends
Bye
Completed the timer

*/