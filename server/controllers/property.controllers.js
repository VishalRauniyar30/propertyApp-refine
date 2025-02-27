import { startSession } from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv'

import propertyModel from '../models/property.models.js'
import userModel from '../models/user.models.js'


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const getAllProperties = async (req, res) => {
    const { 
        _end, 
        _order = 'asc', 
        _start = 0, 
        _sort = 'createdAt', 
        title_like = '',
        propertyType = ''
    } = req.query

    const query = {}

    if(propertyType !== ''){
        query.propertyType = propertyType
    }
    if(title_like){
        query.title = { $regex: title_like, $options: 'i' }
    }

    try {
        const count = await propertyModel.countDocuments({ query })
        const properties = await propertyModel
        .find(query)
        .limit(parseInt(_end) || 9)
        .skip(parseInt(_start) || 0)
        .sort((_sort && _order) ? { [_sort]: _order } : {})

        res.header('x-total-count', count)
        res.header('Access-Control-Expose-Headers', 'x-total-count')

        res.status(200).json(properties)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.params
    
        const existingProperty = await propertyModel.findOne({ _id: id }).populate('creator')
    
        if(existingProperty){
            res.status(200).json(existingProperty)
        } else {
            res.status(404).json({ message: 'property Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProperty = async (req, res) => {
    try {
        const { title, description, price, photo, email, propertyType, location } = req.body

        const session = await startSession()
        session.startTransaction()

        const user = await userModel.findOne({ email }).session(session)

        if(!user) {
            throw new Error("User Not Found")
        }

        const photoUrl = await cloudinary.uploader.upload(photo)

        const newProperty = await propertyModel.create({
            title, description, price, location, propertyType,
            photo: photoUrl.url, creator: user._id
        })

        user.allProperties.push(newProperty._id)
        
        await user.save({ session })

        await session.commitTransaction()

        res.status(200).json({ message: "Property Created Successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params
    
        const { title, description, photo, price, location, propertyType } = req.body
    
        const photoUrl = await cloudinary.uploader.upload(photo)
    
        await propertyModel.findByIdAndUpdate({ _id: id }, {
            title, description, location, propertyType, price,
            photo: photoUrl.url || photo
        })
        res.status(200).json({ message: "Property updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params
        const propertyToDelete = await propertyModel.findById({ _id: id }).populate('creator')

        if(!propertyToDelete){
            throw new Error("Property Not Found")
        }

        const session = await startSession()
        session.startTransaction()

        propertyToDelete.creator.allProperties.pull(propertyToDelete)
        await propertyToDelete.creator.save({ session })

        await propertyModel.deleteOne({ _id: id }, {session})

        await session.commitTransaction()

        session.endSession()
        res.status(200).json({ message: "Property Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
