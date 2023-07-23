# HTTP Non-Persistent & Persistent Connection
- [LINK](https://www.scaler.com/topics/persistent-connection-http/)


# Web Sockets

WebSockets are designed to maintain a persistent and full-duplex communication channel between a client and a server. Unlike traditional HTTP requests that are stateless and disconnected after each exchange, WebSockets keep the connection open, allowing for real-time, bidirectional data transfer. 

[Socket.IO](https://socket.io/): A long polling/WebSocket based third party transfer protocol for Node.js. Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.
It is built on top of the WebSocket protocol and provides additional guarantees like fallback to HTTP long-polling or automatic reconnection.


**WebSockets** are based on the **Transmission Control Protocol (TCP)**. TCP is a reliable, connection-oriented protocol that provides a full-duplex communication channel between two endpoints, ensuring data delivery and order. WebSockets use TCP as the underlying transport layer to establish and maintain a persistent, bidirectional communication channel between a client and a server.

Here's how the WebSocket protocol works:

- Handshake: When a client wants to initiate a WebSocket connection to a server, it sends a standard HTTP request with an "Upgrade" header indicating its desire to upgrade the connection to a WebSocket. If the server supports WebSockets, it responds with an HTTP 101 status code, indicating that the protocol is switching from HTTP to WebSocket.

- Upgraded Connection: Once the handshake is successfully completed, the connection is upgraded from HTTP to WebSocket, and the communication channel remains open for both sending and receiving data.

- Bidirectional Communication: Unlike traditional HTTP, which follows a request-response pattern, WebSockets allow full-duplex communication. Both the client and server can send and receive data independently over the same TCP connection.

- Data Frames: WebSocket data is sent in small packets called "frames." These frames are used to carry messages between the client and server. Frames can be text or binary data, and they include headers to provide information about the payload.

- Persistent Connection: WebSockets maintain a persistent connection, meaning the TCP connection remains open until either the client or server decides to close it explicitly or due to a disconnection event.

By using TCP as the transport layer, WebSockets benefit from its reliability and ability to handle data loss or reordering during transmission. This makes WebSockets ideal for real-time applications, such as chat applications, online gaming, live notifications, and other scenarios where low-latency, bidirectional communication is essential.



Visit this link to learn more about web sockets :

- [LINK](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

# Socket.io

In Socket.IO, `socket.emit()` and `socket.on()` are two important methods used for real-time bidirectional communication between the server and the client in JavaScript. These methods are used to send and receive events and data between the server and the connected clients (web browsers in most cases). Let's take a closer look at each of them:

- **socket.emit(eventName, data)**: The socket.emit() method is used on the client-side to send custom events to the server. It allows the client to emit (send) a specific event to the server, along with optional data to be transmitted.
    - The `eventName` parameter is a string that specifies the name of the event you want to emit. For example, you could have an event named "message", "userJoined", "notification", etc.
    - The `data` parameter is an optional argument that contains the data you want to send along with the event. This can be any valid JavaScript object or data.

- **socket.on(eventName, callback)**: The socket.on() method is used on both the server-side and the client-side to listen for incoming events from the other end (client or server, depending on where it is used).
    - It allows you to define a callback function that will be executed when a specific event (specified by eventName) is received.
    - The `eventName` parameter is a string that indicates which event to listen for.
    - The `callback` parameter is a function that will be called when the specified event is received. The data sent from the other end (client or server) will be passed as an argument to this callback function.
