//import dependenices for mongoose
const { Schema, model } = require("mongoose");

//model schema for the data to be stored
/*See notes in Pizza.js regarding model contruction.
/*This schema we'll never directly be queried to see its data, it is linked to a pizza’s data. This does reduce the number of routes we'll have to set up, but we still need to create functionality for creating and deleting comments this will be handled by the comment-controller.js.*/
const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create the Comment Model using the CommentSchema
const Comment = model("Comment", CommentSchema);

//export the Comment Model this will be imported in ./models/index.js
module.exports = Comment;

/*Again, just like Sequelize, you create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions. Will be imported to index.js in the models directory*/
