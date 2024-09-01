import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const tokenPart = token.split(' ')[1]; 
        
        jwt.verify(tokenPart, process.env.SECRET, (err, user) => {
            if (err) 
                return res.sendStatus(403); 
        
            req.user = user;
            next();
        });
    } else 
        res.sendStatus(401); 
}

export const authorizeUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') 
        next();
    else 
        res.sendStatus(403); 
}