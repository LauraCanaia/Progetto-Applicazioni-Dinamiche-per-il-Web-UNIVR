const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/', controller.getMovies )
router.get('/:title', controller.getMovieByTitle )
//check che il tipo in input sia corretto
module.exports = router