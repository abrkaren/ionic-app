const express = require('express')
const controller = require('../controllers/auth')
const passport = require('passport');

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)

router.get('/getUsers', passport.authenticate('jwt', {session: false}), controller.getUsers)
router.get('/getUserById/:id', passport.authenticate('jwt', {session: false}), controller.getUserById)
router.put('/updateUser/:id', passport.authenticate('jwt', {session: false}), controller.updateUser)
router.post('/checkIfPasswordMatches', passport.authenticate('jwt', {session: false}), controller.checkIfPasswordMatches)
router.delete('/removeAccount/:id', passport.authenticate('jwt', {session: false}), controller.removeAccount)


module.exports = router
