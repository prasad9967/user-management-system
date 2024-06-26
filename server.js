const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')

const app = express()
dotenv.config({path:'config.env'})

app.use(morgan('tiny'))

// mongodb  connection
connectDB()

app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
// app.set('/views', path.resolve(__dirname,"views/ejs"))

app.use('/css',express.static(path.resolve(__dirname, "assets/css")))
app.use('/js',express.static(path.resolve(__dirname, "assets/js")))
app.use('/img',express.static(path.resolve(__dirname, "assets/img")))

// load routers
app.use('/',require('./server/routes/router'))


app.listen(process.env.PORT, () => console.log('server is running'))