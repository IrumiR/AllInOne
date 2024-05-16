import User from "../models/UserSchema.js";
import ServiceProvider from "../models/ServiceProviderSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d"
    })
}

export const register = async (req, res) => {

    const { email, password, name, role, photo } = req.body

    try {

        let user = null

        if (role === 'customer') {
            user = await User.findOne({ email })
        }
        else if (role === 'serviceprovider') {
            user = await ServiceProvider.findOne({ email })
        }

        //check whether the user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if (role === 'customer') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                role
            })
        }

        if (role === 'serviceprovider') {
            user = new ServiceProvider({
                name,
                email,
                password: hashPassword,
                photo,
                role
            })
        }

        await user.save()

        res.status(200).json({ success: true, message: 'User successfully created!' })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
};

export const login = async (req, res) => {

    const { email } = req.body

    try {

        let user = null

        const customer = await User.findOne({ email })
        const serviceprovider = await ServiceProvider.findOne({ email })

        if (customer) {
            user = customer
        }
        if (serviceprovider) {
            user = serviceprovider
        }

        //check whether the user exists or not
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" })
        }

        //get token
        const token = generateToken(user)

        const { password, role, bookings, ...rest } = user._doc

        res.status(200).json({ status: true, message: "Login Successful", token, data: { ...rest }, role })

    } catch (error) {
        res.status(500).json({ status: false, message: "Login failed" })
    }
};