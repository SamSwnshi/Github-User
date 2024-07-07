import mongoose from "mongoose";


const config = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Database/Mongo_DB connected successfully")
    }catch(error){
        console.log("Error in Connectiong to MongoDb",error.message)
    }
}

export default config;