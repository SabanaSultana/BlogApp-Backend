// import model
// here post model and comment model
const Post=require("../models/postModel")
const Comment=require("../models/commentsModel")
// create Comment
exports.createComment=async(req,res)=>{
    try{
        //fetch data from req body
        const {post, user, body}=req.body
        //create a comment object
        const comment =new Comment({
            post,user,body
        })
        //save the new comment into database
        const savedComment=await comment.save();
        // add the new comment to the post's comments array, fetch post by id,,,,,,, new true is updated document
        const updatedPost=await Post.findByIdAndUpdate(post,{$push: {comments: savedComment._id}},{new: true}).populate("comments").exec()
        res.status(200).json(
            {   post:updatedPost,
                success:true,
                data:savedComment,
                message:"Successfully data entry created"
            }
        )
    }
    catch(error){
        console.log(error)
        console.error(error)
        res.status(500).json(
            {
                success:false,
                data:"Internal Server error",
                message:error.message
            }
        )
    }
}

// get comment
exports.fetchComment= async(req,res)=>{
    try{
        const fetchedComment=await Comment.find({})
        res.status(200).json(
            {
                success:true,
                data:fetchedComment,
                message:"Successfully data has fetched"
            }
        )

    }
    catch(error){
        console.log(error)
        console.error(error)
        res.status(500).json(
            {
                success:false,
                error:error.message,
                message:"Server error"
            }
        )
    
    }
}