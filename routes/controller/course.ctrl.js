const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')



exports.save = async (req, res) => {

    try {
        let courseId = req.body.id
        if (courseId == "0") {
            let result = await Model.course.create(req.body)
            return response.onSuccess('Data save Successfully', result, res)
        } else {
            if (mongoose.isValidObjectId(courseId)) {
                delete req.body.id
                let result = await Model.course.findByIdAndUpdate(courseId, req.body, { new: true })
                return response.onSuccess('Data Updated Successfully', result, res)
            }
        }
    }
    catch (error) {
        return response.onError(error, res)
    }
}


exports.delete = async (req, res) => {
    try {
        let courseId = req.body.id
        if (mongoose.isValidObjectId(courseId)) {
            let result = await Model.course.findByIdAndDelete(courseId)
            return response.onSuccess('Data Deleted Successfully', result, res)
        }
    }
    catch (error) {
        return response.onError(error, res)
    }
}


exports.get = async (req, res) => {
    try {
        let result = await Model.course.find().lean()
        return res.status(200).json({ data: result, msg: 'Fetch Data Successfully' })
    }
    catch (error) {
        return response.onError(error, res)

    }
}



