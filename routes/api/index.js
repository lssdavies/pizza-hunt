//importing dependencies and api routes from pizza-routes and comment routes
const router = require("express").Router();
const pizzaRoutes = require("./pizza-routes");
const commentRoutes = require("./comment-routes");

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use("/pizzas", pizzaRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
//this will be imported in the server.js in the root directory
