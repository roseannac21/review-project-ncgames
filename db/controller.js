const { fetchCategories, fetchReviews, fetchReviewById } = require('../db/model');

const getCategories = (request, response, next) => {

    fetchCategories().then((categories) => {
        response.status(200).send({ categories });
      })
      .catch(next)
};


const getReviews = (request, response, next) => {

  fetchReviews().then((reviews) => {
    response.status(200).send({ reviews });
  })
  .catch((err) => {
    console.log(err)
  });
};

const getReview = (request, response, next) => {
  const reviewToGet = request.params.review_id;
 
  fetchReviewById(reviewToGet).then((review) => {
    response.status(200).send({ review });
  })
  .catch(next)
};

module.exports = { getCategories, getReviews, getReview };