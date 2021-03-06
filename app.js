const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const expressSession = require("express-session");

const userRoutes = require("./routes/userRoutes");
const lifeRoutes = require("./routes/partnerRoutes");
const app = express();

app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(bodyParser.json());

app.use(
    expressSession({
        secret: process.env.SECRET || "local development secret",
        saveUninitialized: false,
        resave: false,
    })
);

//  ROUTES 
mongoose
    .connect(
        "mongodb+srv://pooja1012:zZp5MO7JTvgz57Yq@cluster0.ppwwi.mongodb.net/Matrimonial?retryWrites=true&w=majority", { useNewUrlParser: true }
    )

.then((res) => {
        console.log("Mongo successfull connected");
    })
    .catch((err) => console.log(err));
app.use("/user", userRoutes);
app.use("/life", lifeRoutes);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(8000, () => {
    console.log("server is running");
});