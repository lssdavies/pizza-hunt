//importing the models we need
const { Comment, Pizza } = require("../models");

const commentController = {
  //add a comment to the pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //Note here that we're using the $push method to add the comment's _id to the specific pizza we want to update. The $push method works just the same way that it works in JavaScript—it adds data to an array. All of the MongoDB-based functions like $push start with a dollar sign ($), making it easier to look at functionality and know what is built-in to MongoDB and what is a custom noun the developer is using.
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
    /*We're also returning the pizza Promise here so that we can do something with the results of the Mongoose operation. Again, because we passed the option of new: true, we're receiving back the updated pizza (the pizza with the new comment included)*/
  },
  //remove a comment
  removeComment({ params }, res) {
    /*The first method used here, .findOneAndDelete(), works a lot like .findOneAndUpdate(), as it deletes the document while also returning its data. We then take that data and use it to identify and remove it from the associated pizza using the Mongo $pull operation. Lastly, we return the updated pizza data, now without the _id of the comment in the comments array, and return it to the user. */
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
//this will be imported in routes/api/comment-routes.js
