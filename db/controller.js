const { fetchCategories, fetchReviewById } = require('../db/model');

const getCategories = (request, response, next) => {

    fetchCategories().then((categories) => {
        response.status(200).send({ categories });
      })
      .catch(next)
};

const getReview = (request, response, next) => {
  const reviewToGet = request.params.review_id;
 
  fetchReviewById(reviewToGet).then((review) => {
    if (review.length === 0) {
      next();
    }
    response.status(200).send({ review });
  })
  .catch(next)
};

module.exports = { getCategories, getReview };