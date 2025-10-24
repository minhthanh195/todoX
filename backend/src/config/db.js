import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING)
    console.log("connect is success") 
  } catch (error) {
    console.log("connect is fail :", error)
  }
}