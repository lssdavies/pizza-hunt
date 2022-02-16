//importing dependenices from models directory. These controllers are the main CRUD Methods for the /api/pizza endpoint routes. They will hooked up to the routes in the routes folder.
const { Pizza } = require('../models');

/*creating functions as methods of the pizzaController object. Because these methods will be used as the callback functions for the Express.js routes, each will take two parameters: req and res.*/
const pizzaController = {
  /*get all pizzas method is the callback function for the get/api/pizzas route. It uses mongoose .find() method as a catch all much like the .findAll method in sequelize*/
  getAllPizza(req, res) {
    console.log("in get all pizza route");
    Pizza.find({})
    //dbPizzaData is the data returned req ie. request in (req, res)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one pizza by id uses mongoose .findOne() method to  find a single pizza by its _id Instead of accessing the entire req, we've destructured params out of it, because that's the only data we need for this request to be fulfilled. If we can't find a pizza with that _id, we can check whether the returning value is empty and send a 404 status back to alert users that it doesn't exist.
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        //if no pizza is found send 404 ie. if dbPizzaData is false
        if (!dbPizzaData) {
          res.status(404).json({ message: "No Pizza found with his id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .cath((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  /*createPizza In the .createPizza() method, we destructure the body out of the Express.js req object (ie. { body } replaces req) because we don't need to interface with any of the other data it provides. Just like with Sequelize, in Mongoose we use the method .create() to create data. We send a 400 error back if something goes wrong, as we likely sent the wrong type of data for one of the fields*/
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },
  // In mongodb to add data we use the insertOne or insertMany() methods but in mongoose we use create() which will handle either one or multiple inserts.

  /* update pizza by id With the .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document. If we don't set that third parameter, { new: true }, it will return the original document. By setting the parameter to true, we're instructing Mongoose to return the new version of the document.*/
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  /* delete pizza  With the .findOneAndDelete() method, which will find the document to be returned and also delete it from the database. Like with updating, we could alternatively use .deleteOne() or .deleteMany(), but we're using the .findOneAndDelete() method because it provides a little more data in case the client wants it.*/
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};



  /*When setting up a file, you may want to create the data you’ll be exporting and then immediately write the export command so that you don’t forget later on.*/
  module.exports = pizzaController;

  