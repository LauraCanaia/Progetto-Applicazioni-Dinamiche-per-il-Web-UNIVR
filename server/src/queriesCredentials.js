const getCustomerIdAndFilmIdFromCustomerId = "SELECT customer_id, film_id FROM public.basket WHERE customer_id = $1"

const insertIntoBasketCustomerIdAndFilmId = `INSERT INTO public.basket (customer_id, film_id) VALUES($1, $2);`

const deleteBasketByCustomerId = `DELETE FROM public.basket WHERE customer_id=$1;`

const deleteBasketByCustomerIdAndFilmId = `DELETE FROM public.basket WHERE customer_id=$1 AND film_id=$2;`

const getUserByEmail = `select * from public."user" u where email like $1`

module.exports = {
    getCustomerIdAndFilmIdFromCustomerId,
    insertIntoBasketCustomerIdAndFilmId,
    deleteBasketByCustomerId,
    deleteBasketByCustomerIdAndFilmId,
    getUserByEmail
}