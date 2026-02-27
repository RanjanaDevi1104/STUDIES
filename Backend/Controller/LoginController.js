// import bcrypt from 'bcrypt'
// import dotenv from 'dotenv'
// import User from '../Model/Login.js'
// import jwt from 'jsonwebtoken'

// dotenv.config();

// // register 

// export const register = async(req,res)=>{
//     try{
//         const  {name,email,password} = req.body;

//         // checkinguser 

//         const exisitingUser = await User.findOne({email});

//         if(exisitingUser){
//             res.send("user already exsist ")
//         }
//         else {
//             const hashedPassword = await bcrypt.hash(password , 10);

//             await User.create({
//                 name,
//                 email,
//                 password:hashedPassword,
//             });
//             res.send({message:"user register successfully"});
//         } 
//     }
//     catch(err){
//                 res.send({message:"server error" })
//         }
// }



// // login 

// export const login = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     // ADMIN LOGIN
//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const admintoken = jwt.sign(
//         { id: "admin", role: "admin" },
//         process.env.secret_key,
//         { expiresIn: "7d" }
//       );

//       return res.json({
//         message: "Admin login successful",
//         admintoken,
//         role: "admin",
//       });
//     }

//     //  USER LOGIN
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Wrong password" });

//     const token = jwt.sign(
//       { id: user._id, role: "user" },
//       process.env.secret_key,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "User login successful",
//       token,
//       id: user._id,
//       role: "user",
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // delete codes 

// export const deleteuser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await User.findByIdAndDelete(id);

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // all data get 

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.json({ users });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // updated data 

// export const updateusers = async (req, res) => {
//   try {
//     const { id } = req.params; // URL se user ID lena

//     const {password,email} = req.body;

//     const hashedPassword2 = await bcrypt.hash(password,10)

//    await User.findByIdAndUpdate (id,{ email, password:hashedPassword2 })

//     res.json({
//       message: "User updated successfully",
//     });

//   } catch (err) {
//     console.log("Update Error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Deleted data 


// export const DeletedData = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };









import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// मॉडल्स इम्पोर्ट
import User from '../Model/Login.js';
import UserFile from '../Model/BcaModel.js'; 

dotenv.config();

// ================= USER CONTROLLERS =================
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) { 
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const admintoken = jwt.sign({ id: "admin", role: "admin" }, process.env.secret_key, { expiresIn: "7d" });
            return res.json({ message: "Admin login successful", admintoken, role: "admin" });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id, role: "user" }, process.env.secret_key, { expiresIn: "7d" });
        res.json({ message: "User login successful", token, id: user._id, role: "user" });
    } catch (err) { 
        res.status(500).json({ message: "Server error" }); 
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ users });
    } catch (err) { 
        res.status(500).json({ message: "Server error" }); 
    }
};

export const updateusers = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, email } = req.body;
        const hashedPassword2 = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { email, password: hashedPassword2 });
        res.json({ message: "User updated successfully" });
    } catch (err) { 
        res.status(500).json({ message: "Server error" }); 
    }
};

export const DeletedData = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (err) { 
        res.status(500).json({ message: "Server error" }); 
    }
};

// ================= CONTENT/UPLOAD CONTROLLERS =================

export const getAllContent = async (req, res) => {
    try {
        const data = await UserFile.find().sort({ createdAt: -1 });
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
};

export const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, topic } = req.body;
        const updated = await UserFile.findByIdAndUpdate(id, { name, topic }, { new: true });
        res.status(200).json({ message: "Updated successfully", updated });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

export const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Pehle database mein content check karein
        const content = await UserFile.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found in database" });
        }

        // 2. Physical File delete karna (uploads folder se)
        if (content.filename) {
            // path.resolve 'uploads' folder ka absolute path nikalega root directory se
            const filePath = path.resolve('uploads', content.filename); 
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`File: ${content.filename} deleted from server storage.`);
            } else {
                console.log("File not found on server storage, proceeding to delete DB record.");
            }
        }

        // 3. Database se record delete karna
        await UserFile.findByIdAndDelete(id);

        res.status(200).json({ 
            success: true, 
            message: "Content and associated file deleted successfully! ✅" 
        });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ message: "Server error during deletion ❌" });
    }
};