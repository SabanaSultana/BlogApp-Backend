const Post=require("../models/postModel")

//create Post
exports.createPost=async(req,res)=>{
    try{
        const {title,body,likes,comments}=req.body
         //create a post object
         const post =new Post({
            title,body,likes,comments
        })
        //save the new comment into database
        const savedPost=await post.save();
        res.status(200).json({
            data:savedPost,
            success:true
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error:"Internal error in creating Post"
        })
    }
}
// fetch/get post
exports.getPostData=async(req,res)=>{
    try{
        // const postData=await Post.find().populate("comments").populate("likes").exec();
        // const postData=await Post.find().exec();
        const postData=await Post.find().populate("comments").exec();
        res.status(200).json({
            data:postData,
            success:true
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error:"Internal error in creating Post"
        })
    }
}