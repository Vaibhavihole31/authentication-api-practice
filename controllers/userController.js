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
                        const saved_user = await User.findOne({ email: email })
                        const token = jwt.sign({ userID: saved_user._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        res.send({ "status": "success", data: newUser, "message": "Registration Successfully !!✅", "token": token })
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
                        const token = jwt.sign({ userID: user._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                        res.send({ "status": "success", "message": "Login Successfully !!✅", "token": token })
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

    static changeUserPassword = async(req, res)=> {
        const { password, password_confirmation } = req.body

        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status": "failed", "message": "password and password_confirmation does not match "})
            }else{
               const salt = await bcrypt.genSalt(10)
               const hashPassword = await bcrypt.hash(password, salt)
            //    console.log(req.user._id);
            await User.findByIdAndUpdate(req.user._id, { $set: {
                password: hashPassword }})

               res.send({"status" : "feailed", "message" : "password change successfully"})
            }
        }else{
            res.send({"status": "failed", "message": "All fields are required "})
        }
    }
}



export default UserController;