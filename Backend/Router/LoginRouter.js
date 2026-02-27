// import express from 'express'
// import { register , login, getAllUsers, updateusers, DeletedData } from '../Controller/LoginController.js'
// import LoginMiddleware from '../Middleware/LoginMiddleware.js'

// const PasswordRoute = express.Router()

// PasswordRoute.post("/register",register);
// PasswordRoute.post("/login",login);


// // admin part 

// // PasswordRoute.delete("/delete/:id",LoginMiddleware("admin"),deleteuser)
// PasswordRoute.get("/users",LoginMiddleware("admin"),getAllUsers)
// PasswordRoute.put("/update/:id",LoginMiddleware("admin"),updateusers)
// PasswordRoute.delete("/delete/:id",LoginMiddleware("admin"),DeletedData);


// export default PasswordRoute; 


import express from 'express';
import { 
    register, login, getAllUsers, updateusers, DeletedData,
    getAllContent, updateContent, deleteContent   
} from '../Controller/LoginController.js';
import LoginMiddleware from '../Middleware/LoginMiddleware.js';

const PasswordRoute = express.Router();

// ================= PUBLIC ROUTES =================

PasswordRoute.post("/register", register);
PasswordRoute.post("/login", login);
PasswordRoute.get("/content/all", getAllContent); 

// ================= ADMIN ONLY ROUTES =================

// User Management
PasswordRoute.get("/users", LoginMiddleware("admin"), getAllUsers);
PasswordRoute.put("/update/:id", LoginMiddleware("admin"), updateusers);
PasswordRoute.delete("/delete/:id", LoginMiddleware("admin"), DeletedData);

// Content/PDF Management
PasswordRoute.put("/content/update/:id", LoginMiddleware("admin"), updateContent);
PasswordRoute.delete("/content/delete/:id", LoginMiddleware("admin"), deleteContent);

export default PasswordRoute;