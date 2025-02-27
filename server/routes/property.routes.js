import { Router } from "express"

import { 
    getAllProperties, getPropertyDetail, 
    createProperty, updateProperty, deleteProperty 
} from '../controllers/property.controllers.js'

const propertyRouter = Router()

propertyRouter.route('/').get(getAllProperties)
propertyRouter.route('/:id').get(getPropertyDetail)
propertyRouter.route('/').post(createProperty)
propertyRouter.route('/:id').patch(updateProperty)
propertyRouter.route('/:id').delete(deleteProperty)

export default propertyRouter