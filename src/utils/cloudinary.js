import { v2 as cloudinary } from "cloudinary";

import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadFileonCloudinary = async (localFilePath) => {
//   try {

//     if (!localFilePath) return null;
//     const response = await cloudinary.v2.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     }).then(result=>console.log(result));;

//     console.log("response",response)
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); //remove the local stored file if upload operation for failed
//     return null;
//   }
// };

const uploadFileonCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadFileonCloudinary };
