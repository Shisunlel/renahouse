const mongoose = require('mongoose');

//schema setup
let houseSchema = mongoose.Schema({
    title: String,
    price: String,
    description: String,
    image: [String],
    location: String,
    type: String,
    host:{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
      },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ]
})

module.exports = mongoose.model('House', houseSchema);