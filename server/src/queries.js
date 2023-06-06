const getMovies = `SELECT * 
                    FROM film
                    `

const getMovieInfoById = 'SELECT * FROM film WHERE film_id = $1'

const moviesAvailabilityCondition = `(film_id in ( 
                            select film_id 
                            from inventory i 
                            where inventory_id not in ( 
                                select inventory_id 
                                from rental r   
                                where return_date is NULL)  
                            group by film_id)) `

const moviesByTitleCondition = `(title ilike $1)`      

const moviesByCategoryCondition = `(film_id in (select film_id 
                                    from film_category fc 
                                    where category_id = ANY ($1)))`                         



module.exports = {
    getMovies,
    getMovieInfoById,
    moviesAvailabilityCondition,
    moviesByTitleCondition,
    moviesByCategoryCondition
}