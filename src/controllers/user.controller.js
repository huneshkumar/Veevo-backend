import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFileonCloudinary } from "../utils/cloudinary.js";
export const registerUser = asyncHandler(async (req, res) => {
  //signup steps to make sure
  //1- get user details
  //2- check velidations -empty fields
  //3-check if user already exists
  //4- check of image and avatar
  //5- upload images on cloudinary
  //6- get url from cloudinary for image
  //7-create user object- create entry in db
  //8- get details in response-remove password and refresh token from response
  //9- check for user creation

  const { userName, fullName, email, password } = req.body;

  if (
    [userName, fullName, email, password]?.some((filed) => filed?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "user already exist");
  }

  const avatarLocalPath = req?.files?.avatar[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar file is required ");
  }

  const avatarUrl = await uploadFileonCloudinary(avatarLocalPath);
  const coverImageUrl = await uploadFileonCloudinary(coverImageLocalPath);

  if (!avatarUrl) {
    throw new ApiError(400, "avatar image required");
  }

  const user = await User.create({
    userName: userName,
    email: email,
    fullName: fullName,
    password: password,
    avatar: avatarUrl.url,
    coverImage: coverImageUrl.url || "",
  });

  res.status(200).json(user);

  console.log(email);
});
