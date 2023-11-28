//importing mongoose
const mongoose = require('mongoose')
//connecting the mongoose
mongoose.connect('mongodb://127.0.0.1:27017/expressMongoose')
  .then(() => {
    console.log('connected to db')
    //catching errors
  }).catch((err) => console.log(err))