const db = require("../db/connection");
const express = require("express");
const app = express();
const { getCategories } = require('../db/controller')

app.use(express.json());

app.get("/api/", (request, response) => {
    response.status(200).send({ msg: "all ok" });
});

app.get("/api/categories/", getCategories);

module.exports = app;