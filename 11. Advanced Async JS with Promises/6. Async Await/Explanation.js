function download(url) {
    return new Promise(function exec(resolve, reject) {
        console.log("Starting to download data from", url);
        setTimeout(function down() {
            console.log("Downloading completed");
            const content = "ABCDEF"; // assume dummy download content
            resolve(content);
        }, 7000);
    });
}

function writeFile(data) {
    return new Promise(function exec(resolve, reject) {
        console.log("Started writing a file with", data);
        setTimeout(function wrtie() {
            console.log("Completed writing the data in a file");
            const filename = "file.txt";
            resolve(filename);
        }, 5000);
    })
}

function uploadData(file, url) {
    return new Promise(function exec(resolve, reject) {
        console.log("Started uploading", file, "on", url);
        setTimeout(function up() {
            console.log("upload completed");
            const response = "SUCCESS";
            resolve(response);
        }, 2000);
    })
}

function doAfterReceiving(value) {

    let future = iter.next(value);
    console.log("future is", future);
    if(future.done) return;//Base case -> if (future.done == true) nothing more to be called for so return 
    future.value.then(doAfterReceiving);
}

function* steps() {
    const downloadedData = yield download("www.xyz.com");
    console.log("data downloaded is", downloadedData);
    const fileWritten = yield writeFile(downloadedData);
    console.log("file written is", fileWritten);
    const uploadResponse = yield uploadData(fileWritten, "www.drive.google.com");
    console.log("Upload response is", uploadResponse);
    return uploadResponse;
}

const iter = steps();
const future = iter.next();
future.value.then(doAfterReceiving);


/*

-------------------- Output --------------------
Starting to download data from www.xyz.com
Downloading completed
data downloaded is ABCDEF
Started writing a file with ABCDEF
future is { value: Promise { <pending> }, done: false }
Completed writing the data in a file
fiele written is file.txt
Started uploading file.txt on www.drive.google.com
future is { value: Promise { <pending> }, done: false }
upload completed
Upload response is SUCCESS
future is { value: 'SUCCESS', done: true }



-------------------- EXPLANATION --------------------

So here we have 3 normal functions:
1. download(url)
2. writeFile(data)
3. uploadData(file, url)

Async. Generator function:
1. steps() 

> All these 3 functions are promise based functions that takes something and return u a promise
> At line no.52 steps() - generator function is returning you an iterato,so store it in the iter variable
> When u call iter.next() @ line no.53 start executing your generator function - steps()
> The moment you do yield download("www.xyz.com") @ line no. 43, it calls the function download(url) and the function download(url) is just returning u a promise.
> Create a promise object and to create promise object 
1. print "Starting to download data from www.xyz.com" @ line no. 3
2. started a timer. 
So u have a Promise Object-1
{value:undefined,
state:pending,
[],[]    
}
> This above promise object is returned from the download() function to the line no. 43 and @ line no. 43 u are saying yield download("www.xyz.com") 
> So go outside the steps() function and come back to line no. 53. and store `{ value: Promise { <pending> }, done: false }` inside the future variable.
> Go to line no. 54 => future.value.then(doAfterReceiving) => so register a function doAfterReceiving() inside the onfulfillment array of the Promise Object-1
{value:undefined,
state:pending,
[doAfterReceiving],[]    
}
> After 7 secs when setTimeout is done, print "Downloading completed" @ line no. 5 and resolve(content) @ line no. 7
> The moment u resolve(content) @ line no. 7, the Promise Object-1 changes:
{value:ABCDEF,
state:fulfilled,
[doAfterReceiving],[]    
}
> The moment <pending> state of the Promise Object-1 becomes <fulfilled> 
> Inside your MicroTask Queue bring the function doAfterReceiving()
> Event Loop checks that nothing is there in the Global code and the Callstack is also empty
> So start executing the function doAfterReceiving() inside the MicroTask Queue
> Inside the function doAfterReceiving() it calls for the next iter.next(value) @ line no. 36
> The moment you say iter.next(value) @ line no. 36 u went back in the steps() function
> Inside the steps() function, the last yield u did was yield download("www.xyz.com") @ line no. 43, so resume from there
> This whole yield download("www.xyz.com") @ line no. 43 is going to be replaced by your value - ABCDEF
> so downloadedData = ABCDEF
> Go to the next line and print "data downloaded is ABCDEF" @ line no. 44
> Go to the next line and the process continues............



> Go to ./async_await_Demo.js file
*/