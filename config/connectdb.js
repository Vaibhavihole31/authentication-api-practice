import mongoose from "mongoose";
const connection = async (MONGODB_URL) =>{
    try{
        const DB_OPTIONS = {
            dbName: "jwtpractice"
        }
        await mongoose.connect(MONGODB_URL,DB_OPTIONS)
        console.log('Databse connected successfully...');
    }
    catch(err){
        console.log(err.message);
    }
}

export default connection;

