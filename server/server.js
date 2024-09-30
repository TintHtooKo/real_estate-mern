const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const RoleRoute = require('./route/RoleRoute')
const UserRoute = require('./route/UserRoute')
const RentOrSellRoute = require('./route/RentOrSellRoute')
const PropertyRoute = require('./route/PropertyRoute')
const HomeTypeRoute = require('./route/HomeTypeRoute')
require('dotenv').config()


mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('connected to database')
    app.listen(process.env.PORT, ()=>{
        console.log('server is running in port', process.env.PORT);
    })
})

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,
}))


app.use('/role',RoleRoute)
app.use('/user',UserRoute)
app.use('/rentsell',RentOrSellRoute)
app.use('/property',PropertyRoute)
app.use('/type',HomeTypeRoute)
