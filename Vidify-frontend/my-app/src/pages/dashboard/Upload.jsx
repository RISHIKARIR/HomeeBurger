import React, { useState } from 'react'
import { toast } from 'sonner';
import apiFetch from '../../api/apifetch';

function Upload() {

  const  [video,setVideo] = useState(null);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  
  function selectVideo(e){

      setVideo(e.target.files[0]);

  }

  async function submitVideo(e){
    e.preventDefault();
  
    const formdata = new FormData();


    if(!video){
      toast.error("Please select a video to upload");
      return;
    }

   formdata.append("video",video);
   formdata.append("title",title);
   formdata.append("description",description);
   


    try{  
    const uploadvideo = await apiFetch("api/videos/upload-video","post",formdata)

    console.log(uploadvideo.data,"videooeoooeoeoeo");

    if(uploadvideo.data.success){
      toast.success("Video uploaded successfully");
    }
} catch(err){

  console.log(err);
  toast.error (err.uploadVideo.message || "Something went wrong");
}
  }



  return (  
    <div>


      <form className='flex flex-col gap-10 items-center' onSubmit={submitVideo}>
      <input type='text' name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title}  placeholder='Title of the Video' className='p-4 border border-amber-100'></input>
            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} name='description' className='p-5 border rounded' placeholder='Description of video'></textarea>

      <input type='file' onChange={selectVideo} className='bg-red-400 p-5 rounded-md' accept='video/*'></input>

      <button type="submit" className='bg-sky-800 p-2 border rounded-md border-green-300'>Button</button>
      </form>

      
    </div>
  )
}

export default Upload