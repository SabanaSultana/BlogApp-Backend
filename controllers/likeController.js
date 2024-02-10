// exports.dummyLink =(req,res)=>{
//     res.send("This is your dummy link")
// }

const Post=require("../models/postModel")
const Like=require("../models/likeModel")
// create like
exports.createLike=async(req,res)=>{
    try{
        //fetch data from req body
        const {post, user}=req.body
        //create a like object
        const likee =new Like({
            post,user
        })
        //save the new like into database
        const savedLike=await likee.save();
        // add the new like to the post's likes array, fetch post by id,,,,,,, new true is updated document
        const updatedPost=await Post.findByIdAndUpdate(post,{$push: {likes: savedLike._id}},{new: true}).populate("likes").exec()
        res.status(200).json(
            {   post:updatedPost,
                success:true,
                data:savedLike,
                message:"Successfully like data entry created"
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
// remove like
exports.removeLike=async(req,res)=>{
    try{
        //fetch data from req body
        const {post, likee}=req.body
        const deleteLike= await Like.findOneAndDelete({post:post,_id:likee})
        const updatedPost=await Post.findByIdAndUpdate(post, {$pull :{likes:deleteLike._id}},{new : true})
        res.json({
            post:updatedPost
        })
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