import dotenv from 'dotenv'
import connection from './Config/db.config.js'
import {app} from './App.js'
import {v2 as cloudinary} from 'cloudinary'


dotenv.config({
    path:'./env'
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



connection()
    .then(() => {
        app.listen(`${process.env.PORT}`|| 8000, () => {
            console.log(`SERVER is running at port - ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("Could not connect to mongoDB",error)
    })