const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')


exports.registration = async (req, res) => {
    try {
        let user = req.body
        if (user.id == "0" || user.id == null) {
            let numberExist = await Model.user.find({ phone: user.phone })
            if (numberExist.length == 1) {
                return response.onSuccess('Number Already Exist', 0, res)
            }
            else {
                let result = await Model.user.create({ user })
                return response.onSuccess('Account Created Successfully', result, res)
            }
        } else {
        }
    }
    catch (err) {
        return response.onError(err, res)
    }

}



exports.login = async (req, res) => {
    try {
        let data = req.body
        let user = await Model.user.findOne({ email: data.email })
        if (user != null) {
            let valid = await auth.authDecrypt(data.password, user.password)
            if (valid) {
                const token = auth.token(user.id)
                res.setHeader('auth-token', token)
                return response.onSuccess('Login successful', token, res)
            }
            else {
                console.log('rohit')
                return response.onSuccess('Invalid Credential', 0, res)
            }

        }
        else {
            return response.onValidationFailed('Email not Found Register plz', 0, res)
        }


    }
    catch (err) {
        return response.onError(err, res)
    }
}