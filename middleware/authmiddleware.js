import jwt from "jsonwebtoken";
import User from '../models/user.js'

const checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startswith('Bearer')) {
        try {
            token = authorization.split(' ')[1] // space with bbearer and token so used spilt

            // how to verify correct token 

            JWT_SECRET_KEY = "bhdgyyeey4767663bdcjhgyf"
            const { userId } = jwt.verify(token, JWT_SECRET_KEY)

            // get user from token

            req.user = await User.findById(userId).select(-password) // select(-password) this code used to unacced password
            next()
        } catch (err) {
          console.log(err.message);
          res.status(401).send({"status": "failed","message": "unauthorized user"})
        }
    }
    if(!token){
        res.status(401).send({"status": "failed","message": "unauthorized user, No Token"})
    }
}

export default checkUserAuth;