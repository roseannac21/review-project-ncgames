const { fetchCategories, fetchReviewById } = require('../db/model');

const getCategories = (request, response, next) => {

    fetchCategories().then((categories) => {
        response.status(200).send({ categories });
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
  .catch((err) => {
    console.log(err)
  });
}

module.exports = { getCategories, getReview };