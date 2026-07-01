import { UserModel } from '../Models/user.model.js'
import jwt from 'jsonwebtoken'


// Function to login a user
const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All input fields are not filled",
            })
        }

        const existedUser = await UserModel.findOne({ email: email })

        if (!existedUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist with this email",
            })
        }

        const isPasswordMatch = await existedUser.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }

        const token = jwt.sign(
            { userId: existedUser._id, emailId: existedUser.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const userResponse = { ...existedUser.toObject() }
        delete userResponse.password

        return res.status(200).json({
            success: true,
            message: "Successfully login",
            token: token,
            user: userResponse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "user could not be logged in",
        })
    }
}

// Function to Register a user
const register = async (req, res) => {
    const { userName, email, password, phone, dob, gender, bloodGroup } = req.body;

    try {
        const existedUser = await UserModel.findOne({ email })
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email ",
            })
        }

        const user = await UserModel.create({
            email,
            password,
            userName,
            phone,
            dob,
            gender,
            bloodGroup,
        })

        const token = jwt.sign(
            { userId: user.id, emailId: user.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.cookie('token', token, {
           httpOnly: true,
            secure: true,
            sameSite: "none",
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const createdUser = await UserModel.findById(user.id).select(
            "-password "
        )

        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "user could not be created",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: createdUser
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Something went wrong while registering user",
        })
    }
}

// Function to get user
const getMe = async (req, res) => {
    try {
        const user = req.user

        const thisUser = await UserModel.findById(user._id)
            .populate("documents")
            .populate("appointments")
            .populate("medications")
            .populate("bloodRecords")
            .populate("organHealthRecords")
            .select("-password");

        return res.status(200).json({
            success: true,
            user: thisUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Function to Edit a user
const editUser = async (req, res) => {
    const { profilePic, userName, phone, height, weight, allergies, chronicConditions, address } = req.body;

    try {
        const user = req.user;

        const updateUser = await UserModel.findOneAndUpdate({ _id: user._id }, {
            profileImage: profilePic,
            userName,
            phone,
            height,
            weight,
            allergies,
            chronicConditions,
            address,
        })

        const updatedUser = await UserModel.findById(updateUser.id).select(
            "-password "
        )

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user: updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Something went wrong while updating user",
        })
    }
}

// Function to logout a user
const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({
            success: true,
            message: "Successfully logout",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "user could not be logged out",
        })
    }
}

export { login, register, getMe, logout, editUser }