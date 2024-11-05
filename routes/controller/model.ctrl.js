const express = require('express');
const router = express.Router()
const Model = require("../../models/zindex")
let mongoose = require('mongoose');
let response = require('../../core/response')

// router.post('/post', async (req, res) => {
//     try {
//         let data = await Model.data()
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })



exports.insert = async (req, res) => {
    try {
        let data = req.body;
        const dataToSave = await Model.data.create(data)
        return res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}




exports.get = async (req, res) => {
    try {
        const options = {
            page: 1,
            limit: 10,
            collation: {
                locale: 'en',
            },
        };

        let items = await Model.data.paginate({}, options)
        return res.status(200).json(items)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


