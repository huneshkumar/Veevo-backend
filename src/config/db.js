import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connectionInstance=await mongoose.connect(process.env.DB_URL);
    console.log(`db connected DB Host: ${connectionInstance.connection.host} `);
  } catch (error) {
    console.log("error connecting db", error);
  }
};

