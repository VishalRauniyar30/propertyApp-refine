import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './connect.js'
import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: "https://property-app-refine-dashboard.vercel.app",  // Allow only your frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}))

app.use(express.json({ limit: '50mb' }))

app.get('/', (_, res) => {
    res.send({ message: 'Hello World!' })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/properties', propertyRouter)


const PORT = process.env.PORT

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on Port http://localhost:${PORT}`)
            
        })
    } catch (error) {
        console.log(error)
        
    }
}

startServer()