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

module.exports = { fetchCategories, fetchReviews }