const express = require('express')
const router = express.Router()
const codeController = require('../controllers/code.controller')
router.post('/execute', [], codeController.execute)
router.get('/languages',[],codeController.Languages)
module.exports = router
