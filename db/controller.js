const { replicationStart } = require('pg-protocol/dist/messages');
const { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsForReview } = require('../db/model');

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
    .catch(next)
};

const getCommentsForReview = (request, response, next) => {
  const reviewId = request.params.review_id;
  
Promise.all([fetchCommentsForReview(reviewId), fetchReviewById(reviewId)]).then((comments) => {
    if (comments[0].length === 0 && comments[1].length === 0) {
      next();
    } else {
       response.status(200).send(comments[0]);
     }  
  })
  .catch(next);

}

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

module.exports = { getCategories, getReviews, getReview, getCommentsForReview };