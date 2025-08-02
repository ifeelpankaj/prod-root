import mongoose from 'mongoose'
import config from '../config/config.js'

const DbString = config.DB_URI || ''

export default {
    connect: async () => {
        try {
            await mongoose.connect(DbString)
            return mongoose.connection
        } catch (err) {
            //   console.error("Failed to connect to MongoDB", err);
            throw err
        }
    }
}
