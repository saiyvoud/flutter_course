import express from 'express'
import dotenv from 'dotenv'
import router from './router/routers.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();
const app = express();

const Port = process.env.PORT;
const api = '/api'
app.use(cors())
app.use(bodyParser.json({extended: false, limit: '5000mb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '5000mb', parameterLimit: 50000}))
app.use(cookieParser())
app.use(api,router);

app.listen(Port,()=>{
    console.log(`Server is runing on http://localhost:${Port}`)
});