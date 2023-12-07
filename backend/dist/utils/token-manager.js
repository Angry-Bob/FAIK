import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
// Function to create a JSON Web Token (JWT)
export const createToken = (id, email, expiresIn) => {
    // Payload contains the user ID and email
    const payload = { id, email };
    // Sign the payload to generate a JWT using the secret and expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    // Return the generated token
    return token;
};
// Middleware function to verify the JWT in the request cookies
export const verifyToken = async (req, res, next) => {
    // Retrieve the JWT from the signed cookies
    const token = req.signedCookies[`${COOKIE_NAME}`];
    // Check if the token is missing or empty 
    if (!token || token.trim() === "") {
        // Return a 401 Unauthorized response if the token is missing
        return res.status(401).json({ message: "Token Not Received" });
    }
    // Return a Promise to handle asynchronous verification
    return new Promise((resolve, reject) => {
        // Verify the JWT using the secret
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            // If an error occurs during verification, reject the Promise and return a 401 Unauthorized response
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                // If verification is successful, resolve the Promise, store JWT data in res.locals, and call the next middleware
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map