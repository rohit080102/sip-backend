const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')


exports.save = async (req, res) => {
    try {
        let jsonData = req.body
        if (jsonData.id == '0', jsonData.id == null) {
            let blog = await Model.blog.create(jsonData)
            return response.onSuccess('Blog Added Successfully', blog, res)
        }
        else {
            if (mongoose.isValidObjectId(jsonData.id)) {
                let id = jsonData.id
                delete jsonData.id
                let result = await Model.blog.findByIdAndUpdate(id, jsonData, { new: true }).lean()
                return response.onSuccess('Data Updated Successfully', result, res)
            }

        }

    } catch (error) {
        return response.onError(error, res)
    }
}


exports.delete = async (req, res) => {
    try {
        let blogId = req.body.id
        if (mongoose.isValidObjectId(blogId)) {
            let result = await Model.blog.findByIdAndDelete(blogId)
            return response.onSuccess('Data Deleted Successfully', result, res)
        }
    }
    catch (error) {
        return response.onError(error, res)
    }
}


exports.getListBlogs = async (req, res) => {
    try {
        let { limit, page } = req.body
        let blogs = await Model.blog.paginate({}, { limit, page, sort: { createdAt: -1 } })
        return response.onSuccess('List Blogs', blogs, res)
    } catch (error) {
        return response.onError(error, res)
    }
}
