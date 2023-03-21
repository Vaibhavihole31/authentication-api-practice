import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    static UserRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            res.status(201).send({ "status": "false", "message": "Email already exists" })
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
                        res.status(201).send({ "status": "false", "message": "unable to register" })
                    }
                }
                else {
                    res.status(201).send({ "status": "false", "message": "password and confirm password doesn't match" })
                }
            }
            else {
                res.status(201).send({ "status": "false", "message": "All fields are required " })
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body

            if (email && password) {
                const user = await User.findOne({ email: email })

                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        res.send({ "status": "success", "message": "Login Successfully !!✅" })
                    } else {
                        res.status(201).send({ "status": "false", "message": "email or password is not valid " })
                    }

                } else {
                    res.status(201).send({ "status": "false", "message": "You are not a registered User" })
                }
            }
            else {
                res.status(201).send({ "status": "false", "message": "All fields are required " })
            }
        } catch (err) {
            console.log(err.message);
            res.status(201).send({ "status": "false", "message": "Unable to Login" })
        }
    }
}



export default UserController;