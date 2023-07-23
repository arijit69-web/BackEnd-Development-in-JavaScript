var socket = io(); // creating a socket object by calling an io() function -> setting up a new web-socket connection to the server

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {

    socket.emit("FromClient") // `FromClient` is the name of the event

});
socket.on("FromServer", () => {// `FromServer` is the name of the event
  // If it receives an event from the `FromServer`, it will to do something

  let div = document.getElementById("serverDiv");
  let p = document.createElement("p"); // creating a <p></p> tag in html
  p.textContent = "Received an Event from the Server";
  div.appendChild(p);
});
