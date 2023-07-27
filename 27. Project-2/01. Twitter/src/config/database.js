const mongoose = require("mongoose");
const { MONGO_URL } = require("./server-config");

const connect = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports =  {connect} ;
