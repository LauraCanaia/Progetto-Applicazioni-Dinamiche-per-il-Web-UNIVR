const pool = require('../../db')
const queries = require('./queries')


const getActors = (req,res) => {
    console.log('getActors')
    pool.query(queries.getActors, (error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const getActorsById = (req,res) => {
    console.log('getActorsById')
    const id = parseInt(req.params.id)
    console.log(id)
    pool.query(queries.getActorsById, [id], (error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}


const mockedActors = [{
    actor_id : 201,
    first_name : 'Brad',
    last_name : 'Pitt',
    last_update : '2017-03-17T17:29:21.758Z'
},
{
    actor_id : 201,
    first_name : 'Brad',
    last_name : 'Pitt',
    last_update : '2017-03-17T17:29:21.758Z'
}]

const getMockedActors = (req,res) => {
    console.log('getMockedActors')
    res.status(200).json(mockedActors)
}

module.exports = {
    getActors,
    getActorsById,
    getMockedActors
}