const mongoose = require('mongoose')

const uri='mongodb+srv://qingao2221:2221@cluster0.yydd2.mongodb.net/test?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB