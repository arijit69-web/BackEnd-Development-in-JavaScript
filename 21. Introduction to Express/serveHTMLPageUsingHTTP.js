const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer(function listner(request, response) {
  if (request.url == "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        console.error(err);
        response.end("500 - Internal Server Error");
        return;
      }
      response.end(data);
    });
  } else {
    response.end("404 - Page Not Found");
  }
});

server.listen(PORT, function () {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
