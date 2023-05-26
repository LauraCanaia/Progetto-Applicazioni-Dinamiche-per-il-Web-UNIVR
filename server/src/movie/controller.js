const pool = require('../../db')
const queries = require('./queries')

const getMovies = (req,res) => {
    console.log('getMovies')
    pool.query(queries.getMovies, (error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const getMovieByTitle = (req,res) => {
    console.log('getMovieByTitle')
    const title = req.params.title
    console.log(title)
    pool.query(queries.getMovieByTitle, [title], (error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getMovies,
    getMovieByTitle
}