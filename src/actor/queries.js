const getActors = 'SELECT * FROM actor'
const getActorsById = 'SELECT * FROM actor WHERE actor_id = $1'

module.exports = {
    getActors,
    getActorsById,
}