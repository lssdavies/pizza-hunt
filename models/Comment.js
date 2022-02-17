/*import dependenices for mongoose and importing getter function. We have included Type with schema and model to be used as a unique identifier making reply schema a sub document of comment schema*/
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

/*model schema for the comments and comment replies See notes in Pizza.js regarding model contruction.*/
/*The ReplySchema will never query for just reply data. We will use MongoDB to create replies as a subdocument array for comments. To normalize it, we'll create a schema for it.*/
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      //generating the same type of ObjectId() value that the _id field typically does.
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
/*The CommentSchema will never directly be queried to see its data, it is linked to a pizza’s data. This does reduce the number of routes we'll have to set up, but we still need to create functionality for creating and deleting comments this will be handled by the comment-controller.js.*/
const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      /*Using a getter to format time, the function is in the utils folder and was exported so it is imporeted on line 3*/
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    /*Associate ReplySchema with comments. The replies field will populate with an array of data that adheres to the ReplySchema definition*/
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

//Create the Comment Model using the CommentSchema
const Comment = model("Comment", CommentSchema);

//export the Comment Model this will be imported in ./models/index.js
module.exports = Comment;

/*Again, just like Sequelize, you create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions. Will be imported to index.js in the models directory*/
