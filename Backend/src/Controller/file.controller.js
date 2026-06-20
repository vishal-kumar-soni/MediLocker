import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Function to upload profile images on cloudinary
const uploadProfileImage = async (req, res) => {
    try {
        const localPath = req.file?.path

        if (!localPath) {
            return res.status(400).json({
                success: false,
                message: "File path missing"
            })
        }

        const response = await cloudinary.uploader.upload(
            localPath,
            {
                resource_type: 'auto',
                folder:"MediLocker/profilePictures"
            },
        )

        console.log("The Profile image is Successfully uploaded on cloudinary")

        fs.unlinkSync(localPath)

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Error in response"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfull",
            image_url: response.secure_url
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Upload failed",
            data: error
        })
    }
}

// Function to upload document on cloudinary
const uploadDocument = async (req, res) => {
    try {
        const localPath = req.file?.path

        if (!localPath) {
            return res.status(400).json({
                success: false,
                message: "File path missing"
            })
        }

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto',
            folder:'MediLocker/Documents'
        })

        console.log("The document is Successfully uploaded on cloudinary")

        fs.unlinkSync(localPath)

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Error in response"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Document uploaded successfull",
            image_url: response.secure_url
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Upload failed",
            data: error
        })
    }
}

export { uploadProfileImage, uploadDocument }