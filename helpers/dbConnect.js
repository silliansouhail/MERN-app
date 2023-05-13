const mongoose = require('mongoose')
require('dotenv').config()

const connection = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log('Connected to the database is established successfully'))
    .catch(err=> console.log(err))
}

module.exports = connection