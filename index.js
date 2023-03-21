import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectdb from './config/connectdb.js'


const app = express()
const port = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors())

connectdb(MONGODB_URL)

app.listen(port, ()=>{
    console.log(`server started on ${port} 🎯`);
})