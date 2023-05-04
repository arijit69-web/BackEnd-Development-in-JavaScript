/*
- Instead of setting up the HTTP server from scratch using JS, developers use external libraries like ExpressJS.

- NodeJS provides us with a basic setup using which we can actually set up a basic HTTP server without using any 3rd party libraries.

- HTTP is an internal module that is already provided to us by NodeJS and many 3rd parties external libraries depend on these HTTP modules.
*/
const http = require("http"); // Internal module to set up our own HTTP server

const PORT = 3000;

/* Using the createServer function we can actually create a basic HTTP server using the HTTP module
   This function returns a server object, and takes a callback as an argument.
   This function created a server object but didn't start the server
*/
const server = http.createServer(function listener(request, response) {
  /* 
        this callback is a kind of listener() function that is going to collect
         every HTTP request that we will make to our server
    */
  /*
    - request -> we will be able to see the details object of incoming HTTP request -> object
    - response -> we will be able to configure what response we need to send for an incoming HTTP request -> object
    */
  //console.log("Incoming Req:", request);
  //console.log("Outgoing Res:", response);

  if (request.url == "/home") {
    // if we make a request on `/home` path/route this if() block will be executed
    console.log("Request Method:", request.method);
    /* 
    The first time response.write() is called, it will send the buffered header information and the first chunk of the body to the client. The second time response.write() is called, Node.js assumes data will be streamed, and sends the new data separately. That is, the response is buffered up to the first chunk of the body. Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again. 
    This sends a chunk of the response body. This method may be called multiple times to provide successive parts of the body.
    */
    response.write("Hi Arijit!\n");
    response.write("How are you?\n");
    response.write("Love You All.\n");

    response.end("Have a nice day!"); // Whatever your response is, by default the browser will represent it as a certain set of HTML code. It won't know where to terminate and will keep on loading if you don't do response.end(). The End method causes the Web server to stop processing the script and return the current result. The remaining contents of the file are not processed.

    // how can we send an HTML code, or JSON from this setup ?
  }
  console.log("Request received"); // At any particular time if someone hits my server, print `Request received` in the console.
});

server.listen(PORT, function exec() {
  // once server.listen() boot up the server on the given port number, this callback exec() will be executed
  console.log(`Server is up and running on PORT: ${PORT}`);
});

// This server is currently running on my machine. It is not hosted/available on the internet. This server is only accessible from my machine.

/*
The term is a pseudo name for 127.0.0.1, the IP address of 
the local computer. This IP address allows the machine to 
connect to and communicate with itself. Therefore, localhost
(127.0.0.1) is used to establish an IP connection to the 
same device used by the end-user.

A loopback address has been built into the IP domain system
in order to allow for a device to send and receive its own
data packets. An address that sends outgoing signals back to
the same computer for testing.

LocalHost will still work fine even if you don't have internet on your local system.

In IPv4, 127.0.0.1 is the most commonly used loopback address

[TLS is the updated version of SSL]
U need to set up an SSL certificate on your server and can 
get it issued from any Certificate Authority and that can 
help u to set up an HTTPS server.
*/

/*
Qs. What is Postman?
Ans: Postman is a know application in web development and 
application development. Postman is an API platform for 
developers to design, build, test, and iterate their APIs. 
It is used by developers to make requests to APIs, and by 
QA teams to test the APIs. 
*/
