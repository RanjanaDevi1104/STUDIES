import  express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import PasswordRoute from './Router/LoginRouter.js'
import coursesroute from './Router/BcaRoute.js'
import router from './Router/MailRouter.js';
import router2 from './Router/EnrollmentRouter.js'

dotenv.config();

const server = express()
server.use(express.json())
server.use(cors());
server.use("/api/auth",PasswordRoute)
server.use("/api",coursesroute)
server.use("/api",router)
server.use("/api/enroll",router2)

 mongoose
 .connect(process.env.MONGO_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

server.listen(process.env.PORT)