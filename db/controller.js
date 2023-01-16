const { fetchCategories, fetchReviews } = require('../db/model');
const { response } = require('./app');

const getCategories = (request, response, next) => {

  fetchCategories().then((categories) => {
    response.status(200).send({ categories });
  })
    .catch((err) => {
      console.log(err)
    });
};

const getReviews = (request, response, next) => {

  fetchReviews().then((reviews) => {
    response.status(200).send({ reviews });
  })
    .catch((err) => {
      console.log(err)
    });
};

const getCommentsForReview = (request, response, next) => {

  const reviewId = request.params.review_id;

  fetchCommentsForReview(reviewId).then((comments) => {
    response.status(200).send({ comments });
  })
  .catch((err) => {
    console.log(err)
  });
}

module.exports = { getCategories, getReviews, getCommentsForReview };