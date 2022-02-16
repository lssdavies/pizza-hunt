//importing  dependencies for router and and the methods used in the routes
const router = require("express").Router();
const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
/*We need two parameters to delete a commentbecause after deleting a particular comment, you need to know which pizza that comment originated from.*/
router.route('/:pizzaId/:commentId').delete(removeComment);


module.exports = router;
//routes are exported to the ./api/index.js