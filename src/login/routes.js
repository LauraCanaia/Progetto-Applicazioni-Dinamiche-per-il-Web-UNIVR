const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/:username&:password', controller.mockLogin )

module.exports = router