import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import "dotenv/config"

export const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            name:user.name
        },
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    )
}

export const verifyToken=(token)=>{
    try {
        if(!token){
            throw new AuthenticationError('no token found')
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        console.error("invalid token",error)
    }
}

export const authContext = ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    
    const context = {};
    
    try {
      if (token) {
        const user = verifyToken(token);
        context.user = user;
      }
    } catch (err) {
      console.error('Auth error:', err.message);
    }
    
    return context;
};
  
  
export const requireAuth = (next) => (root, args, context, info) => {
if (!context.user) {
    throw new AuthenticationError('You must be logged in');
}
return next(root, args, context, info);
};

export const ipContext = ({ req }) => ({
    ip: req.ip || req.headers['x-forwarded-for'] || 'Unknown'
  });
