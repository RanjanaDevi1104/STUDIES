import jwt from 'jsonwebtoken';

const BcaMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      const decode = jwt.verify(token, process.env.secret_key);

      if (requiredRole && decode.role !== requiredRole) {
        return res.status(403).json({ message: "Access Denied" });
      }

      req.role = decode.role;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

export default BcaMiddleware;
