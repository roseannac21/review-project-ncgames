const db = require("../db/connection");

const fetchCategories = () => {
    let queryStr = `SELECT * FROM categories;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviews = () => {
    let queryStr = `SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at DESC;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviewById = (id) => {
   let queryStr = `SELECT * FROM reviews WHERE review_id = ${id};`

   if (isNaN(id) || id === NaN) {
    return Promise.reject({status: 400, msg: "invalid ID data type"})
  }

    return db.query(queryStr).then(({rows}) => {
        return rows;
    })
}

const fetchCommentsForReview = (id) => {
    let queryStr = `SELECT * FROM comments WHERE review_id = $1;`

  if (isNaN(id) || id === NaN) {
    return Promise.reject({status: 400, msg: "invalid ID data type"})
  }
  
    return db.query(queryStr, [id]).then(({rows}) => {
        return rows;
    })
}

module.exports = { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsForReview }