const db = require("../db/connection");

const fetchCategories = () => {
    let queryStr = `SELECT * FROM categories;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviewById = (id) => {
    const parsedId = parseInt(id)
    
    if (id > 24) {
        return Promise.reject({status: 404, msg: "invalid review ID"})
    };

    if (isNaN(parsedId) === true) {
        return Promise.reject({status: 400, msg: "invalid data type"})
    }

    let queryStr = `SELECT * FROM reviews WHERE review_id = ${id};`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

module.exports = { fetchCategories, fetchReviewById }