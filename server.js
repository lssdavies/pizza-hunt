//IMporting server dependencies
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

/*tells mongoose which db to connect to; If the enviroment variable process.env.MONGODB_URI exist like on heroku in live deployment it will use that or the db on your localhost. If there is no db for mongo to connect to it will create one*/
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1/pizza-hunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
