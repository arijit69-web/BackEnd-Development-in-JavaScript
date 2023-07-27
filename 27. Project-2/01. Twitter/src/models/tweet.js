const mongoose = require("mongoose");

// Creating the structure/schema of the Tweet Schema

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

// Creating the model/actual instances of the Tweet Schema

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;

/*
The __v field is called the version key. 
It describes the internal revision of a document.
This __v field is used to track the revisions of a document. 
By default, its value is zero.
*/
