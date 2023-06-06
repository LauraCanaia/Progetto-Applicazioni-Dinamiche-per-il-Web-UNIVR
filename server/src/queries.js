const getMovies = 'SELECT * FROM film'
const getMoviesealtro = `select * from film f join "language" l on f.language_id = l.language_id `
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

const getMoviesInCategory = `select *
                            from film f 
                            where f.film_id in 
                            (
                            select film_id 
                            from film_category fc 
                            where category_id = ANY ($1))`


const getAvailableMoviesInCategory = `select *
                            from film f 
                            where f.film_id in 
                            (
                                select film_id 
                                from film_category fc 
                                where category_id = ANY ($1))
                            and
                            f.film_id in ( 
                                select film_id 
                                from inventory i 
                                where inventory_id not in ( 
                                    select inventory_id 
                                    from rental r   
                                    where return_date is NULL)  
                                group by film_id) `

const getAvailableMoviesInCategoryByTitle = `select *
                            from film f 
                            where f.film_id in 
                            (
                                select film_id 
                                from film_category fc 
                                where category_id = ANY ($1))
                            and
                            f.film_id in ( \
                                select film_id \
                                from inventory i \
                                where inventory_id not in ( \
                                    select inventory_id \
                                    from rental r   \
                                    where return_date is NULL)  \
                                group by film_id) 
                            and
                            title ilike $1 `

                            



module.exports = {
    getMovies,
    getMovieByTitle,
    getMovieInfoById,
    getAvailableMovies,
    getMoviesealtro,
    getMoviesInCategory
}