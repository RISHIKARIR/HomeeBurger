 import pool from "../db.js";
import cloudinary from "../utils/cloudinary.js";



 export const UploadVideo = async (req,res)=>{

   const { title,description } = req.body;

    console.log(req.file);

    try {

   if(!title || !req.file){
      return res.status(400).json({
         message : "Both video and its title is required",
         success : false
      })}

      const upload = await cloudinary.uploader.upload(req.file.path,
         {
            resource_type : "video"
         }

      );

      if(!upload){
         return res.status(401).json({
            message : "Video not uploaded",
            success : false
         })
      }



    const saveVideoDetails = await pool.query(`INSERT INTO user_videos
         (user_id,cloudinary_public_url,description,public_id,title) 
         VALUES  ($1,$2,$3,$4,$5)`,[req.user.id,upload.secure_url,description,upload.public_id,title])

         if(saveVideoDetails.rowCount>0){
              return res.status(200).json({
            message : "Video saved successfully",
            success : true
         })
         }else{
            return res.status(400).json({
               message : "Video not saved",
               success : false
            })


         }
         


       


   } catch(err) {
      console.log(err,"error hai");

      return res.status(500).json({
         message : "Something went wrong",
         success : false
      })

   }

 }







export const getVideos = async(req,res)=>{

   const userId = req.user.id;

   try{

   const userVideos = await pool.query(`SELECT * FROM user_videos WHERE user_id=$1`,[userId]);


   if(userVideos.rows === 0){


      return res.status(200).json({
         message : "No videos found",
         success  : true
      })
   }




   return res.status(200).json({
      message : "Videos returned successfully",
      success : true,
      data : userVideos.rows
   })


   }catch(err){
      return res.status(500).json({
         message : "Something went wrong",
         success : false
      })


   }








}












