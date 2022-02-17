//import dependenices for mongoose and dateFormat function
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//model schema for the data to be stored
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      /*Using a getter to format time, the function is in the utils folder and was exported so it needs to be imported in this file*/
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    /*We are creating a relationship between pizza model and comment and model here. We need to tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model as shown below. The ref property is especially important because it tells the Pizza model which documents to search to find the right comments. */
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    /* for the virtual property below on line 37 to work we need to instruct the schema to use virtuals. This is done by adding the toJson property to the schema, and the id is set to false because this is a virtual that Mongoose returns, and we don’t need it. We are also using a getter on line 18 so we need to the same as with a virtual*/
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// get total count of comments and replies on retrieval using virtuals. The reduce() is to tally up the total of every comment with its replies. .reduce() takes two parameters, an accumulator and a currentValue ie. (total, comment). As .reduce() goes through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array. */
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

/*Similar to sequelize we create a schema using the schema constructor imported from mongoose at line 1. We dont have to define the fields as mongodb will allow the data anyway but we should regulate what the data will look like. The type field uses JavaScript data types, notice the [] to indicate an array for toppings but you could also specify Array instead of using the brackets. In the createAt field if the user doesnt enter data the date.now function execute and provide a timestamp.*/

//Create the Pizza Model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza Model this will be imported in ./models/index.js
module.exports = Pizza;

/*Again, just like Sequelize, you create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions. Will be imported to index.js in the models directory*/
