const getMovies = `SELECT *  FROM film`

const getRentalByRentalId = `select * from rental r where rental_id = $1`
const getCustomerById = `select * from customer c where customer_id = $1`
const getInventoryById = `select * from inventory i where inventory_id = $1`
const getLanguageById = `select * from language where language_id = $1`
const getAddressById = `select * from address a where a.address_id = $1`

const getRentalByCustomerId = `select * from rental r where customer_id = $1`

const getPaymentByRentalId = `select * from payment p where rental_id = $1`

const getAvailableInventoryIdByFilmIdAndStoreId = `select inventory_id
                                from rental
                                where inventory_id in (select inventory_id 
                                                    from inventory i 
                                                    where film_id = $1 and store_id = $2) 
                                                and inventory_id not in (
                                                    select inventory_id
                                                    from rental
                                                    where return_date is null)
                                group by inventory_id;`
const getcategoryById = 'select * from category c group by category_id' 

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

const getActorFromFilmId = "select * from actor a join film_actor fa on a.actor_id = fa.actor_id where fa.film_id = $1"

const getCategoryByFilmId = "select * from category c join film_category fc on c.category_id  = fc.category_id where fc.film_id = $1"

const getMoviesByFilmIds = 'SELECT * FROM film WHERE film_id = ANY ($1)'

const insertNewRental = `INSERT INTO public.rental (rental_date, inventory_id, customer_id, return_date, staff_id, last_update) 
                        VALUES($1, $2, $3, NULL, $4, now());`

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
    getRentalByRentalId,
    getAddressById,
    getCustomerById,
    getInventoryById,
    getLanguageById,
    getStoreByFilmId,
    getMovieById,
    moviesAvailabilityCondition,
    moviesByTitleCondition,
    moviesByCategoryCondition,
    getRentalByCustomerId,
    getPaymentByRentalId,
    getcategoryById,
    getAvailableInventoryIdByFilmIdAndStoreId,
    insertNewRental,
    getActorFromFilmId,
    getCategoryByFilmId,
    getMoviesByFilmIds
}