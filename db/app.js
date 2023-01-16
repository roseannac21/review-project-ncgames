const db = require("../db/connection");
const express = require("express");
const app = express();
const { getCategories, getReviews, getCommentsForReview } = require('../db/controller')

app.use(express.json());

app.get("/api/", (request, response) => {
    response.status(200).send({ msg: "all ok" });
});

app.get("/api/categories/", getCategories);

app.get("/api/reviews/", getReviews);

app.get("/api/reviews/:review_id/comments/", getCommentsForReview)

// app.use((err, request, response, next) => {
//     if(err) {
//         console.log(err)
//     }
// })

module.exports = app;