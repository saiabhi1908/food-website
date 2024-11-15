import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://skolli5:Laasyap1908@cluster0.pfmmw.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

