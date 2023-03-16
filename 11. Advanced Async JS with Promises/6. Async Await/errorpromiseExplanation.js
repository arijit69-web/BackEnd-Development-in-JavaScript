function download(url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from", url);
    setTimeout(function down() {
      console.log("Downloading completed");
      const content = "ABCDEF"; // assume dummy download content
      reject(content);
    }, 1000);
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
  });
}

function uploadData(file, url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Started uploading", file, "on", url);
    setTimeout(function up() {
      console.log("upload completed");
      const response = "SUCCESS";
      resolve(response);
    }, 2000);
  });
}

// .then() chain based code

download("www.xyz.com")
  .then(
    function processDownload(value) {
      console.log("downloading done with following value", value);
      return writeFile(value);
    },
    function downloadreject(value) {
      console.log("download reject", value);
    }
  )
  .then(
    function processWrite(value) {
      console.log("data written in the file with name", value);
      return uploadData(value, "www.upload.com");
    },
    function writereject(value) {
      console.log("write reject", value);
    }
  )
  .then(
    function processUpload(value) {
      console.log("we have uploaded with", value);
    },
    function uploadreject(value) {
      console.log("upload reject", value);
    }
  );

/*
---------------OUTPUT---------------

Starting to download data from www.xyz.com
Downloading completed
download reject ABCDEF
data written in the file with name undefined 
Started uploading undefined on www.upload.com
upload completed
we have uploaded with SUCCESS

---------------EXPLANATION---------------

> Fulfillment Handlers : processDownload, processWrite, processUpload
> Rejection Handlers : downloadreject, writereject, uploadreject


> download() promise get rejected
> Rejected the download promise but still trying to write something in the file because we have not returned anything inside the downloadreject or writereject or uploadreject 
> Since we are not returning, it is going to the next chain i.e. processWrite().
> writeFile() is never called 
> In chaining of .then() it is actually becoming difficult to handle rejections in b/w.
> Whenever u use a keyword throw it's a kind of exception that occurs.
> Below is the updated/modified code with the throw keyword.

*/

function download(url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from", url);
    setTimeout(function down() {
      console.log("Downloading completed");
      const content = "ABCDEF"; // assume dummy download content
      reject(content);
    }, 1000);
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
  });
}

function uploadData(file, url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Started uploading", file, "on", url);
    setTimeout(function up() {
      console.log("upload completed");
      const response = "SUCCESS";
      resolve(response);
    }, 2000);
  });
}

download("www.xyz.com")
  .then(
    function processDownload(value) {
      console.log("downloading done with following value", value);
      return writeFile(value);
    },
    function downloadreject(value) {
      console.log("download reject", value);
      throw value;
    }
  )
  .then(
    function processWrite(value) {
      console.log("data written in the file with name", value);
      return uploadData(value, "www.upload.com");
    },
    function writereject(value) {
      console.log("write reject", value);
      throw value;
    }
  )
  .then(
    function processUpload(value) {
      console.log("we have uploaded with", value);
    },
    function uploadreject(value) {
      console.log("upload reject", value);
    }
  );

/*
---------------OUTPUT---------------

Starting to download data from www.xyz.com
Downloading completed
download reject ABCDEF
write reject ABCDEF
upload reject ABCDEF

---------------EXPLANATION---------------

> In this code, when the promise of the download() gets rejected, it immediately rejects write and upload because it never called processWrite() and processUpload()
> This is one way of Handling but it is very long
> Go to ./catchpromise.js

*/
