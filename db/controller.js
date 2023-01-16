const { fetchCategories, fetchReviews } = require('../db/model');

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

module.exports = { getCategories, getReviews };