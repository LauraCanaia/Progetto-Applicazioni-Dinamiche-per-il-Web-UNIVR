const getMovies = `SELECT * 
                    FROM film
                    `

const getRentalById = `select * from rental r where rental_id = $1`
const getCustomerById = `select * from customer c where customer_id = $1`
const getInventoryById = `select * from inventory i where inventory_id = $1`
const getLanguageById = `select * from language where language_id = $1`
const getAddressById = `select * from address a where a.address_id = $1`

const getMovieById = 'SELECT * FROM film WHERE film_id = $1'

const getStoreByFilmId = `select * 
from store s 
where store_id  in (select i.store_id 
	from inventory i 	
	where i.film_id = $1
	and 
	inventory_id not in ( 
	    select inventory_id 
	    from rental r   
	    where return_date is NULL)
	    )`

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
    getRentalById,
    getAddressById,
    getCustomerById,
    getInventoryById,
    getLanguageById,
    getStoreByFilmId,
    getMovieById,
    moviesAvailabilityCondition,
    moviesByTitleCondition,
    moviesByCategoryCondition
}