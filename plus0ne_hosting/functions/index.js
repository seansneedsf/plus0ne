const functions = require('firebase-functions');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//bot router handler
const botRouter = require("./dialog");
app.use("/api/dialog", botRouter);

//event router handler
const eventRouter = require("./event");
app.use("/api/event", eventRouter);
exports.app = functions.https.onRequest(app);