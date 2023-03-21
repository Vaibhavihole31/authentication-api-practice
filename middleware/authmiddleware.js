import jwt from "jsonwebtoken";
import User from '../models/user.js'

const checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1] // space with bbearer and token so used spilt
            //  console.log("Token", token);

            // how to verify correct token 

            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            // console.log(userID);

            // get user from token

            req.user = await User.findById(userID).select('-password') // select(-password) this code used to unacced password
            // console.log(req.user);
            next()
        } catch (err) {
            console.log(err.message);
            res.status(401).send({ "status": "failed", "message": "unauthorized user" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "unauthorized user, No Token" })
    }
}

export default checkUserAuth;