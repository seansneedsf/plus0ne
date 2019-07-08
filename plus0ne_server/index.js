const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//bot router handler
const botRouter = require("./dialog");
app.use("/api/dialog", botRouter);

//event router handler
const eventRouter = require("./event");
app.use("/api/event", eventRouter);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log("Listen to Port: ", process.env.EXPRESS_PORT);
});