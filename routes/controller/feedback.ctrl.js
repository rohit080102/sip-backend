const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')


exports.save = async (req, res) => {
    try {
        let jsonData = req.body
        if (jsonData.id == '0', jsonData.id == null) {
            let feedback = await Model.feedback.create(jsonData)
            return response.onSuccess('Thanks for Your Feedback', feedback, res)
        }
        else {
            if (mongoose.isValidObjectId(jsonData.id)) {
                let id = jsonData.id
                delete jsonData.id
                let result = await Model.feedback.findByIdAndUpdate(id, jsonData, { new: true }).lean()
                return response.onSuccess('Data Updated Successfully', result, res)
            }

        }

    } catch (error) {
        return response.onError(error, res)
    }
}


exports.delete = async (req, res) => {
    try {
        let feedbackId = req.body.id
        if (mongoose.isValidObjectId(feedbackId)) {
            let result = await Model.feedback.findByIdAndDelete(feedbackId)
            return response.onSuccess('Data Deleted Successfully', result, res)
        }
    }
    catch (error) {
        return response.onError(error, res)
    }
}


exports.getListFeedbacks = async (req, res) => {
    try {
        let { limit, page } = req.body
        let feedbacks = await Model.feedback.paginate({}, { limit, page, sort: { createdAt: -1 } })
        return response.onSuccess('List Feedbacks', feedbacks, res)
    } catch (error) {
        return response.onError(error, res)
    }
}
