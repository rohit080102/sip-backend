const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')
let auth = require('../../core/authentication');




exports.registration = async (req, res) => {
    try {
        let staff = req.body
        if (staff.id == "0" || staff.id == null) {
            let emailExist = await Model.staff.find({ email: staff.email })
            if (emailExist.length == 1) {
                return response.onSuccess('Email Already Exist', 0, res)
            }
            else {
                let hashPassword = await auth.authEncrypt(staff.password)
                let result = await Model.staff.create({ ...staff, password: hashPassword })
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
        let staff = await Model.staff.findOne({ email: data.email })
        if (staff != null) {
            let valid = await auth.authDecrypt(data.password, staff.password)
            if (valid) {
                const token = auth.token(staff.id)
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


