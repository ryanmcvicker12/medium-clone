const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"


/** configure cloudinary */

cloudinary.config({
    cloud_name: 'chidumennamdi',
    api_key: '',
    api_secret: ''
})

/**connect to mongodb datastore */

try{
  mongoose.connect(url, {
      //userMongoClient: true

  })
} catch(error){

}

let port = 5000 || process.env.PORT

/** set up routes {api endpoints} */

routes(router)

/** set up middlewares */

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api',router)

/** start server */

app.listen(port, () => {
  console.log('Server started at port : ${port}');
});
