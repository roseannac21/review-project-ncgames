const db = require("../db/connection");
const express = require("express");
const app = express();
const { getCategories, getReviews, getReview, postCommentById } = require('../db/controller')

app.use(express.json());

app.get("/api/", (request, response) => {
    response.status(200).send({ msg: "all ok" });
});

app.get("/api/categories/", getCategories);

app.get("/api/reviews/", getReviews);

app.get("/api/reviews/:review_id/", getReview);

app.post("/api/reviews/:review_id/comments", postCommentById)

app.use((req, res, next) => {
  res.status(404).send({msg: "path not found"})
})

app.use((err, req, res, next) => {
    if (err.code === '42703') {
      res.status(400).send({msg: "invalid data type"})
    } else {
    next(err);
    }
  });

module.exports = app;