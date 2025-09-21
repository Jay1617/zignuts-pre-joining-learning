import mongoose from "mongoose";
export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Blogify"
    })
    .then(() =>{
        console.log("Connected to database!");
    })
    .catch((err) =>{
        console.log(`Error occure while connected to database ${err}`);
    });
}