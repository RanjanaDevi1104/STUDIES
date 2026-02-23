import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from '../Model/Login.js'
import jwt from 'jsonwebtoken'

dotenv.config();

// register 

export const register = async(req,res)=>{
    try{
        const  {name,email,password} = req.body;

        // checkinguser 

        const exisitingUser = await User.findOne({email});

        if(exisitingUser){
            res.send("user already exsist ")
        }
        else {
            const hashedPassword = await bcrypt.hash(password , 10);

            await User.create({
                name,
                email,
                password:hashedPassword,
            });
            res.send({message:"user register successfully"});
        } 
    }
    catch(err){
                res.send({message:"server error" })
        }
}



// login 

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // ADMIN LOGIN
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const admintoken = jwt.sign(
        { id: "admin", role: "admin" },
        process.env.secret_key,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin login successful",
        admintoken,
        role: "admin",
      });
    }

    //  USER LOGIN
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.secret_key,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User login successful",
      token,
      id: user._id,
      role: "user",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// delete codes 

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// all data get 

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// updated data 

export const updateusers = async (req, res) => {
  try {
    const { id } = req.params; // URL se user ID lena

    const {password,email} = req.body;

    const hashedPassword2 = await bcrypt.hash(password,10)

   await User.findByIdAndUpdate (id,{ email, password:hashedPassword2 })

    res.json({
      message: "User updated successfully",
    });

  } catch (err) {
    console.log("Update Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Deleted data 


export const DeletedData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
