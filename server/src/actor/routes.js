const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/', controller.getActors )
router.get('/mock', controller.getMockedActors )
router.get('/:id', controller.getActorsById )


module.exports = router