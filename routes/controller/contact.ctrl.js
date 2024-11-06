const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')


exports.save = async (req, res) => {
    try {
        let jsonData = req.body
        if (jsonData.id == '0', jsonData.id == null) {
            let contact = await Model.contact.create(jsonData)
            return response.onSuccess('You will be Contacted soon', contact, res)
        }
        else {
            if (mongoose.isValidObjectId(jsonData.id)) {
                let id = jsonData.id
                delete jsonData.id
                let result = await Model.contact.findByIdAndUpdate(id, jsonData, { new: true }).lean()
                return response.onSuccess('Data Updated Successfully', result, res)
            }

        }

    } catch (error) {
        return response.onError(error, res)
    }
}


exports.delete = async (req, res) => {
    try {
        let contactId = req.body.id
        if (mongoose.isValidObjectId(contactId)) {
            let result = await Model.contact.findByIdAndDelete(contactId)
            return response.onSuccess('Data Deleted Successfully', result, res)
        }
    }
    catch (error) {
        return response.onError(error, res)
    }
}


exports.getListContacts = async (req, res) => {
    try {
        let { limit, page } = req.body
        let contacts = await Model.contact.paginate({}, { limit, page, sort: { createdAt: -1 } })
        return response.onSuccess('List Contacts', contacts, res)
    } catch (error) {
        return response.onError(error, res)
    }
}
