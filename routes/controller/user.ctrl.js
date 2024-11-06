
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')
let auth = require('../../core/authentication');


exports.registration = async (req, res) => {
    try {
        let user = req.body
        let emailExist = await Model.user.find({ email: user.email })
        if (emailExist.length == 1) {
            return response.onSuccess('Email Already Exist', 0, res)
        }
        else {
            let hashPassword = await auth.authEncrypt(user.password)
            console.log(hashPassword);
            // let result = await model.create({ ...student, password: hashPassword })
            // return response.onSuccess('Registration successful', result, res)

            let result = await Model.user.create({ ...user, password: hashPassword })
            return response.onSuccess('Account Created Successfully', result, res)
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
                return response.onSuccess('Login successful', { user, token }, res)
            }
            else {
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



exports.getListUsers = async (req, res) => {

    try {
        let { option, search } = req.body
        let users = await Model.user.paginate(search, option)
        return response.onSuccess('Users List', users, res)
    } catch (error) {
        return response.onError(error, res)
    }


}