const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//bot router handler
const botRouter = require("./dialog");
app.use("/api/dialog", botRouter);

//event router handler
const eventRouter = require("./event");
app.use("/api/event", eventRouter);

const dialogFlow = require("./dialogflow");
app.use("/api/dialog", dialogFlow);

app.listen(8000, () => {
    console.log("Listen to Port: ", 8000);
});