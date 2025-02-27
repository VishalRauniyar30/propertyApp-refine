import { Router } from "express"

import { createUser, getAllUsers, getUserInfoById } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.route('/').get(getAllUsers)
userRouter.route('/').post(createUser)
userRouter.route('/:id').get(getUserInfoById)

export default userRouter