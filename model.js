const db = require("./db/connection");

const fetchCategories = () => {
    let queryStr = `SELECT * FROM categories;`

    return db.query(queryStr).then((result) => {
        return result.rows;
    })
}

const fetchReviews = (sort_by = "created_at", order = "desc", category) => {

    if (!["title", "designer", "owner", "review_img_url", "review_body", "category", "created_at", "votes", "comment_count"].includes(sort_by)) {
        return Promise.reject({status: 400, msg: "invalid sort query"})
      };

    if (order !== undefined && !["desc", "asc"].includes(order)) {
        return Promise.reject({status: 400, msg: "invalid order query"})
      };

    if (category !== undefined && !["social deduction", "dexterity", "strategy", "hidden-roles", "push-you-luck", "deck-building", "engine-building", "roll-and-write"].includes(category)) {
        return Promise.reject({status: 400, msg: "invalid category query"})
      };

    const queryStr = `SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id`

    if (category === undefined) {

        const queryAddition = ` GROUP BY reviews.review_id
            ORDER BY ${sort_by} ${order};`
        
        const finalQuery = queryStr.concat(queryAddition)

        return db.query(finalQuery).then((result) => {
            return result.rows;
    })

    } else {

        const queryAddition = ` WHERE category = $1
        GROUP BY reviews.review_id
        ORDER BY ${sort_by} ${order};`

        const finalQuery = queryStr.concat(queryAddition)
    
    return db.query(finalQuery, [category]).then((result) => {
        return result.rows;
    })
}
}

const fetchReviewById = (id) => {
   let queryStr = `SELECT reviews.*, 
    COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id
    ORDER BY created_at DESC;`

    return db.query(queryStr, [id]).then(({rows}) => {
        return rows;
    })
}

const addNewComment = (review_id, author, body) => {

    let queryStr = `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;`

    return db.query(queryStr, [review_id, author, body]).then((response) => {
        return response.rows
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


const updateVotes = (votes, id) => {
    let queryStr = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`

    return db.query(queryStr, [votes, id]).then((response) => {
        return response.rows;
    })

}

const fetchUsers = () => {
    let queryStr = `SELECT * FROM users;`

    return db.query(queryStr).then((response) => {
        return response.rows;
    })
}

module.exports = { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsForReview, addNewComment, updateVotes, fetchUsers }

