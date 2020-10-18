
const express = require("express");
const mongoose = require("mongoose");



// app config variables
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const port = process.env.PORT || 9000;

// /////////////////  MIDDLEWARE //////////////////////////////////
app.use(express.json());


////////////// Config //////////////////////////////////////////
//DB config
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
        res.setHeader("Access-Control-Allow-Headers", "*"),
        next();
});

// routes
// routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));