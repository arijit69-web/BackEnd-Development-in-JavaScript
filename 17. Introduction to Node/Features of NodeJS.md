**The rest of the things are in COPY.**

## Basic NodeJS Architecture
- Input Output (I/O) process is expensive in ur computer system.
- Implementation of I/O are of 2 types:
    - **Blocking** - Synchronous I/O is a mechanism in which the process is blocked until the I/O operation is completed. This can happen when there is no way for processes to continue until their scheduled event has finished. In this case, synchronous I/O needs to wait patiently till it has been given permission by its supervisor program to proceed with further processing.
    - **Non-Blocking** - Asynchronous I/O is a technique to handle I/O operations without blocking the process. In other words, asynchronous I/O performs an operation on some data or resource and returns immediately without waiting for a response from another system. It’s used when the user wants to perform an operation that does not need constant interaction with your application, but the user still wants it done as soon as possible (e.g., printing something out). This approach allows more flexibility in program flow since it allows users to work with multiple threads at once and avoid deadlocks between them.

There are a lot of things happening inside your runtime:

- **Event Demultiplexer** is run by libuv which is a library that allows JavaScript code (via V8) to perform I/O, in-network, file, etc. It is an asynchronous IO library that allows Node.js to perform I/O.

- **V8 Engine** -> JS engine, developed by Google for chrome, fastest engine for JS.

- **libuv** -> When we ship the features end-to-end to a particular customer. We can't rely on their system requirements. Since we can't depend on OS-specific features so libuv is sandboxed into Node for OS-specific features and functions. Library libuv prepared by NodeJS core team, written in C++. It makes Node compatible with all OS. (I/O bindings)/ (Low-level I/O) based implementations in a more compatible form of Node with respect to any OS.

- **bindings** -> special programs that help to interact with the libuv library.

Visit these link to learn more about NodeJS Architecture :

- [NodeJS Architecture](https://dev.to/altamashali/deep-dive-into-nodejs-architecture-5190)

</br>

## Globals in NodeJS

Global variables are available everywhere in the node.

- process
- __dirname
- require
- global
- module 

**Note:** Never update a global objects -> might be catastrophic for others working on the project. 

**Note:** Different runtimes can implement similar features or functions of js differently. like setTimeOut in Node spits out an object & in the browser, it spits a number.