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

async function steps() {
  try {
    console.log("starting steps");
    const downloadedData = await download("www.xyz.com");
    return downloadedData;
  } catch (error) {
    console.log("we have handled the error", error);
  } finally {
    console.log("ending");
  }
}

steps();

/*
---------------OUTPUT---------------

starting steps
Starting to download data from www.xyz.com
Downloading completed
we have handled the error ABCDEF
ending

---------------EXPLANATION---------------

> The try statement defines a code block to run (to try).

> The catch statement defines a code block to handle any error.

> The finally statement defines a code block to run regardless of the result.

> The throw statement defines a custom error.



*/