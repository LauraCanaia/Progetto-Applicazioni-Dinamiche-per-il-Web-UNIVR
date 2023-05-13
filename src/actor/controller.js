const pool = require('../../db')
const queries = require('./queries')

const getActors = (req,res) => {
    console.log('getting actors')
    pool.query(queries.getActors, (error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getActors,
}