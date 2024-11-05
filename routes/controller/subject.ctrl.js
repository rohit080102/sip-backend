const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')



exports.save = async (req, res) => {
    try {
        const id = req.body.id
        if (id == "0") {
            let result = await Model.subject.create(req.body)
            return response.onSuccess('Data Insert Succefully', result, res)
        } else {
            if (mongoose.isValidObjectId(id)) {
                delete req.body.id
                let result = await Model.subject.findByIdAndUpdate(id, req.body, { new: true })
                return response.onSuccess('Data Updated sucefully', result, res)
            } else {
                return response.onSuccess('Invalid object id', 0, res)
            }
        }
    }
    catch (err) {
        return response.onError(err, res)
    }
}


exports.delete = async (req, res) => {
    // let data = req.body
    try {
        let = await Model.subject.findByIdAndDelete(req.body.id)
        return response.onSuccess('Data Deleted successfully', 1, res)
    } catch (error) {
        return response.onError(error, res)
    }
}


exports.get = async (req, res) => {
    try {
        let result = await Model.subject.find();
        return response.onSuccess("Data Fetched", result, res)
    } catch (error) {
        return response.onError(error, res)
    }
}