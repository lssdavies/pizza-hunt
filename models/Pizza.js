//import dependenices for mongoose
const { Schema, model } = require('mongoose');

//model schema for the data to be stored
const PizzaSchema = new Schema ({
    pizzaName:  {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size:   {
        type: String,
        default: 'Large'
    },
    toppings: []

});

/*Similar to sequelize we create a schema using the schema constructor imported from mongoose at line 1. We dont have to define the fields as mongodb will allow the data anyway but we should regulate what the data will look like. The type field uses JavaScript data types, notice the [] to indicate an array for toppings but you could also specify Array instead of using the brackets. In the createAt field if the user doesnt enter data the date.now function execute and provide a timestamp.*/

//Create the Pizza Model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;

/*Again, just like Sequelize, you create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions. Will be imported to index.js in the models directory*/