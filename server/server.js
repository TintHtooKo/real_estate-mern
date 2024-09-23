const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('connected to database')
    app.listen(process.env.PORT, ()=>{
        console.log('server is running in port', process.env.PORT);
    })
})
