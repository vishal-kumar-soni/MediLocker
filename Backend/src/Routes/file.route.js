import {Router} from 'express'
const route = Router()
import {upload} from '../Middleware/multer.js'
import {uploadProfileImage, uploadDocument} from '../Controller/file.controller.js'


route.post(
    '/upload/profileImage',
    upload.single('profileImage'),
    uploadProfileImage
)

route.post(
    '/upload/document',
    upload.single('document'),
    uploadDocument
)


export default route