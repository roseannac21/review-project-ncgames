const db = require("../db/connection");
const express = require("express");
const app = express();
const { getCategories, getReviews } = require('../db/controller')

app.use(express.json());

app.get("/api/", (request, response) => {
    response.status(200).send({ msg: "all ok" });
});

app.get("/api/categories/", getCategories);

app.get("/api/reviews/", getReviews);

module.exports = app;