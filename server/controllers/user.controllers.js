import userModel from "../models/user.models.js"

export const getAllUsers = async (req, res) => {
    
    try {
        const allUsers = await userModel.find({}).limit(req.query._end)

        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createUser = async(req, res) => {
    try {
        console.log("Received request to create user:", req.body)
        const { name, email, avatar } = req.body
        const existingUser = await userModel.findOne({ email })
    
        if(existingUser){
            console.log("User already exists:", existingUser)
            return res.status(200).json(existingUser)
        }
    
        const newUser = await userModel.create({
            name, email, avatar
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserInfoById = async(req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findOne({ _id: id }).populate('allProperties')
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}