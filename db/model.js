const db = require("../db/connection");

const fetchCategories = () => {
    let queryStr = `SELECT * FROM categories;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviewById = (id) => {
    let queryStr = `SELECT * FROM reviews WHERE review_id = ${id};`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

module.exports = { fetchCategories, fetchReviewById }