const { fetchCategories, fetchReviews, fetchReviewById, addNewComment } = require('./model');

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

// const getCommentsForReview = (request, response, next) => {

//   const reviewId = request.params.review_id;

//   fetchCommentsForReview(reviewId).then((comments) => {
//     response.status(200).send({ comments });
//   })
//   .catch((err) => {
//     console.log(err)
//   });
// }

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

const postCommentById = (request, response, next) => {
  const reviewToCommentOn = request.params.review_id;
    const commentAuthor = request.body.author;
    const commentBody = request.body.body;
  
    addNewComment(reviewToCommentOn, commentAuthor, commentBody).then((newComment) => {
      response.status(201).send({ comment: newComment })    
    })
  
   // response.status(201).send({ comment });
  }


module.exports = { getCategories, getReviews, getReview, postCommentById };