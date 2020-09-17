const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

const fs = require('fs');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt)
            //  }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async function(req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save();

            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }

    }
}

module.exports.getUsers = async function (req, res) {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.getUserById = async function(req, res) {
    try {

        const user = await User.findById(req.params.id)

        const dontSendFrontThisFields = user.toObject(); // chem Uxarkum Im Uzac Fieldern Front
        delete dontSendFrontThisFields.password;

        res.status(200).json(dontSendFrontThisFields)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateUser = async function (req, res) {

    let data = {};

    let updateForm = req.body.updateForm;
    
    if(updateForm.password){
        const salt = bcrypt.genSaltSync(10)
        const password = updateForm.password
        data.password = bcrypt.hashSync(password, salt);
    }

    data.email = updateForm.email;

    User.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function (err, user) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

module.exports.checkIfPasswordMatches = async function (req, res) {
    
    try {

        let isMatches = false;

        const checkPassword = req.body.checkPassword.checkPassword;
        const userId = req.body.userId;

        let data = {};
        data._id = userId

        const removedUser = await User.find(data);
        
        // compare password start
        const passwordEnteredByUser = req.body.checkPassword.checkPassword
        const hash = removedUser[0].password

        bcrypt.compare(passwordEnteredByUser, hash, function(err, isMatch) {
            if (err) {
               // throw err
            } else if (!isMatch) {
                console.log("Password doesn't match!")
                isMatches = false
            } else {
                console.log("Password matches!")
                isMatches = true
            }
            console.log(isMatches)
            res.status(200).json(isMatches)
        })

    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.removeAccount = async function (req, res) {

    try {
        // console.log(req.params.id)
        await User.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Account removed...'
        })
    } catch (e) {
        errorHandler(res, e)
    }

}