//Server Create
const express=require("express")
// server activate
const app=express();
require("dotenv").config();
const port=process.env.PORT || 5000
// middleware
app.use(express.json());

const blog=require("./routes/blog")
//mount
app.use("/api/v1",blog)
const connectDB=require("./config/database")
connectDB();
// start the server 
app.listen(port,()=>{
    console.log(`App is started at port ${port}`)
})
// default route
app.get("/",(req,res)=>{
    res.send("<h1>This is my homepage </h1>")
})