// import jwt from "jsonwebtoken";

// export const verifyUser = (req, res, next) => {

//   const authHeader = req.headers.authorization;

//   // DEBUG (temporary)
//   console.log("Auth header:", authHeader);

//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization header missing" });
//   }

//   if (!authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Invalid token format" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.secret_key);

//     req.user = decoded;   // user data store
//     next();

//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };







import jwt from "jsonwebtoken";
import User from "../Model/Login.js"; // your user model

// Verify logged-in user and attach user data
export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Invalid token format" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.secret_key);

    // Option 1: If you want fresh user data from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // full user object (id, name, email, role)
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};