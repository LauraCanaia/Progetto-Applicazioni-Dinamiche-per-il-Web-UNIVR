const getMovies = 'SELECT * FROM film'

const getAvailableMovies = 'select * \
                            from film f \
                            where f.film_id in ( \
                                select film_id \
                                from inventory i \
                                where inventory_id not in ( \
                                    select inventory_id \
                                    from rental r   \
                                    where return_date is NULL)  \
                                group by film_id) '
const getMovieByTitle = 'SELECT * FROM film WHERE title ilike $1 '
const getMovieInfoById = 'SELECT * FROM film WHERE film_id = $1'




module.exports = {
    getMovies,
    getMovieByTitle,
    getMovieInfoById,
    getAvailableMovies
}