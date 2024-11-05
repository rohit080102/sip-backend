const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')
let auth = require('../../core/authentication');


exports.registration = async (req, res) => {

    try {
        let model = Model.student
        let student = req.body
        console.log(student);

        let emailCheck = await model.findOne({ email: student.email })
        if (emailCheck) {
            return response.onSuccess('Email already registered', 0, res)
        }

        let hashPassword = await auth.authEncrypt(student.password)
        console.log(hashPassword);
        let result = await model.create({ ...student, password: hashPassword })
        return response.onSuccess('Registration successful', result, res)

    } catch (err) {
        return response.onError(err, res)
    }





}


exports.login = async (req, res) => {

    try {
        let model = Model.student

        let request = req.body

        let student = await model.findOne({ email: request.email })
        if (!student) {
            return response.onSuccess('Email not found', 0, res)
        }

        let cmpPassword = await auth.authDecrypt(request.password, student.password)
        // console.log(cmpPassword);

        if (!cmpPassword) {
            return response.onSuccess("Invalid Credential", 0, res)
        }
        console.log(student)
        const token = auth.token(student.id)
        return response.onSuccess("login successful", token, res)

    } catch (err) {
        return response.onError(err, res)
    }
}