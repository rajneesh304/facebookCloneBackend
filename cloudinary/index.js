import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary, params: {
    folder: 'Fakebook',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

export default cloudinary;