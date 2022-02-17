//importing  dependencies for router and and the methods used in the routes
const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);
// This updates a comment with a reply so using put opposed to post
router.route("/:pizzaId/:commentId").put(addReply);

// /api/comments/<pizzaId>/<commentId>
/*We need two parameters to delete a commentbecause after deleting a particular comment, you need to know which pizza that comment originated from.*/
router.route("/:pizzaId/:commentId").delete(removeComment);

//this remove a reply from a specif comment
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
//routes are exported to the ./api/index.js
