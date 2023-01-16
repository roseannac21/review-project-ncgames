const db = require("../db/connection");

const fetchCategories = () => {
    let queryStr = `SELECT * FROM categories;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviews = () => {
    let queryStr = `SELECT * FROM reviews;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchCommentsForReview = (id) => {
    let queryStr = `SELECT * FROM comments WHERE review_id = ${id};`

    return db.query(queryStr).then((result) => {
        //console.log(result.rows)
        return result.rows;
    })
}

module.exports = { fetchCategories, fetchReviews, fetchCommentsForReview }