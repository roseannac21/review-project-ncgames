const { fetchCategories, fetchReviews, fetchReviewById, addNewComment, fetchCommentsForReview, updateVotes, fetchUsers } = require('./model');

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

const postCommentById = (request, response, next) => {
  const reviewToCommentOn = request.params.review_id;
    const commentAuthor = request.body.author;
    const commentBody = request.body.body;
  
    addNewComment(reviewToCommentOn, commentAuthor, commentBody).then((newComment) => {
      response.status(201).send({ comment: newComment })    
    })
    .catch(next);
  }

const patchVotes = (request, response, next) => {
  const reviewId = request.params.review_id;
  const noOfVotes = request.body.inc_votes;

  updateVotes(noOfVotes, reviewId).then((review) => {
    if (review.length === 0) {
      next();
    }
    const reviewInObj = {review}.review
    const [reviewObj] = reviewInObj
    response.status(201).send(reviewObj)
  })
  .catch(next)

}

const getUsers = (request, response, next) => {

  fetchUsers().then((users) => {
    response.status(200).send({users})
  })
}

module.exports = { getCategories, getReviews, getReview, getCommentsForReview, postCommentById, patchVotes, getUsers };

