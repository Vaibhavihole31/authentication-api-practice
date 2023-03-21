import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    static UserRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            res.send({ "status": "false", "message": "Email already exists" })
        }
        else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc
                        })
                        await newUser.save()
                        res.send({ "status": "success", data: newUser, "message": "Registration Successfully !!✅" })
                    }
                    catch (err) {
                        console.log(err.message);
                        res.send({ "status": "false", "message": "unable to register" })
                    }
                }
                else {
                    res.send({ "status": "false", "message": "password and confirm password doesn't match" })
                }
            }
            else {
                res.send({ "status": "false", "message": "All fields are required " })
            }
        }
    }
}

export default UserController;