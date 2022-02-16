/*imports the dependecies and controller functionality for the routes from pizza-controller.js. We simply provide the name of the controller method as the callback? That's why we set up those methods to accept req and res as parameters initially*/
const router = require("express").Router();
/*
Implement Controller Methods: 
Instead of importing the entire object ie.
const pizzaController = require('../../controllers/pizza-controller') and having 
to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly.*/
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");

/*Since we deconstructed the methods from pizza-controller in the object above we can included them in the routes by name*/
// Set up GET all and POST at /api/pizzas
router.route("/").get(getAllPizza).post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;

/*This is a new Express.js Router setup which instead of creating duplicate routes for the individual HTTP methods, we can combine them. The following variations achieve the same goal:

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);

Because we aren't actually writing the route functionality, this will keep the route files a lot cleaner and to the point. As an added benefit, it also abstracts the database methods from the routes, giving us the option to write unit tests with Jest. */
