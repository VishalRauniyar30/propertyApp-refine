import { connect, set } from "mongoose"

const connectDB = (url) => {
    set('strictQuery', true)

    connect(url)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error))
}

export default connectDB