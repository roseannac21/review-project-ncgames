const { fetchCategories } = require('../db/model');

const getCategories = (request, response, next) => {

    fetchCategories().then((categories) => {
        response.status(200).send({ categories });
      })
      .catch((err) => {
        console.log(err)
      });
};

module.exports = { getCategories };