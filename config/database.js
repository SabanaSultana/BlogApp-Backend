const mongoose=require("mongoose")
// store data from env file to process object
require("dotenv").config();
const  connectDB =()=>{
    mongoose.connect((process.env.DATABASE_URL),{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("db connected successfully"))
    .catch((error)=>{
        console.log("DB facing connection issue")
        console.log(error)
        process.exit(1)
    })
}
module.exports=connectDB;