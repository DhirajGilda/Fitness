// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

export const verifytoken=async (req,res,next)=>{
    try {
        let token=req.header("Authorization");
        console.log('JWT token:', token);
      
        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        console.log('Decoded token:', verified);
        console.log('Verifying token...');
        next();
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

// import jwt from 'jsonwebtoken';

// // Verify Token Middleware
// export const verifytoken = (req, res, next) => {
//   // Get the token from the request headers
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Missing token' });
//   }

//   try {
//     // Verify the token with the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Add the decoded payload to the request object
//     req.user = decoded;

//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };
