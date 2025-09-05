import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const uploadFileonCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath) return null
      const response =await  cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log("your file has been uploaded ",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the local stored file if upload operation for failed
        return null
    }
}

export {uploadFileonCloudinary}





