import express from 'express'
import { register , login, deleteuser, getAllUsers, updateusers, DeletedData } from '../Controller/LoginController.js'
import LoginMiddleware from '../Middleware/LoginMiddleware.js'

const PasswordRoute = express.Router()

PasswordRoute.post("/register",register);
PasswordRoute.post("/login",login);


// admin part 

PasswordRoute.delete("/delete/:id",LoginMiddleware("admin"),deleteuser)
PasswordRoute.get("/users",LoginMiddleware("admin"),getAllUsers)
PasswordRoute.put("/update/:id",LoginMiddleware("admin"),updateusers)
PasswordRoute.delete("/delete/:id",LoginMiddleware("admin"),DeletedData);


export default PasswordRoute; 