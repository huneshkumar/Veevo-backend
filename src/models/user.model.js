import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const
 userSchema = mongoose.Schema(
  {
        userName: {
      type: String,
      resquired: true,
    },
    email: {
      type: String,
      resquired: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect= async function(password){
         return  await bcrypt.compare(password,this.password)
     
}

userSchema.methods.generateAccessToken= async function(){
return jwt.sign({
    _id:this.id,
    email:this.email,
    fullName:this.fullName,
    userName:this.userName 

},process.env.ACCESS_TOKEN,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshToken= async function(){
    return jwt.sign({
    _id:this.id,


},process.env.REFRESH_TOKEN,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = mongoose.model("User", userSchema);
