import React, { useEffect, useState } from "react";
import apiFetch from "../../api/apifetch";
import {
  Video,
  Search,
  Eye,
  ThumbsUp,
  Clock3,
  ArrowUpDown,
} from "lucide-react";
import VideoCard from "../../component/your-Videos/videoCard";
import useVideos from "../../hooks/useVideos";




function YourVideos() {
  const [videos, setVideos] = useState({});
  const { data,isLoading,error } = useVideos();
    const videosData = data?.data;

  console.log(data,"data dikhaio zra")

  useEffect(() => {
    async function showVideos() {
      // const response = await apiFetch("api/videos/get-videos","get")
      // console.log(response, "responseeeee");
      // setVideos(response);
    }

    showVideos();
  }, []);

  // console.log(videos?.data?.data,"viddoodododo")

  return (
    <div className="h-screen">
      <div className="mb-10">
        <h1 className="text-white text-3xl font-semibold">My Videos</h1>
        <p>Manage, edit and track all your uploaded content</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="h-20 w-64 bg-[#1A1714] rounded-xl flex items-center px-5 gap-4 border border-[#2A2420]">
          <span className="bg-[#2A2420] p-3 rounded-lg">
            <Video className="w-5 h-5 text-[#D99A1B]" />
          </span>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-white">24</h2>
            <p className="text-sm text-gray-400">Total Videos</p>
          </div>
        </div>

        <div className="h-20 w-64 mb-10 bg-[#1A1714] rounded-xl flex items-center px-5 gap-4 border border-[#2A2420]">
          <span className="bg-[#2A2420] p-3 rounded-lg">
            <Eye className="w-5 h-5 text-[#D99A1B]" />
          </span>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-white">198.4K</h2>
            <p className="text-sm text-gray-400">Total Views</p>
          </div>
        </div>

        <div className="h-20 w-64 bg-[#1A1714] rounded-xl flex items-center px-5 gap-4 border border-[#2A2420]">
          <span className="bg-[#2A2420] p-3 rounded-lg">
            <ThumbsUp className="w-5 h-5 text-[#D99A1B]" />
          </span>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-white">14.2K</h2>
            <p className="text-sm text-gray-400">Total Likes</p>
          </div>
        </div>

        <div className="h-20 w-64 bg-[#1A1714] rounded-xl flex items-center px-5 gap-4 border border-[#2A2420]">
          <span className="bg-[#2A2420] p-3 rounded-lg">
            <Clock3 className="w-5 h-5 text-[#D99A1B]" />
          </span>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-white">4,821 hrs</h2>
            <p className="text-sm text-gray-400">Watch Time</p>
          </div>
        </div>
      </div>



      

      <div className="relative flex gap-5 justify-between">



      <div className="flex gap-5">

        <Search className="absolute opacity-50 top-2.5 left-2" size={20} />
        <input
          placeholder="Search your videos..."
          className="p-2 pl-10 border border-[#2A2420]
     bg-[#1E1916] rounded-2xl"
        ></input>

        <select className="bg-[#1E1916] border border-[#2A2420] text-[#8A8175] rounded-2xl p-2 text-center  pl-3 pr-7">
          <option value={""}>All categories</option>
          <option value="recipe">Recipe Tutorial</option>
          <option value="masterclass">Masterclass</option>
          <option value="dessert">Dessert</option>
        </select>

        <select className="bg-[#1E1916] border border-[#2A2420] text-[#8A8175] rounded-2xl p-2 text-center  pl-3 pr-7">
          <option value={""}>All status</option>
          <option value="Pending">Pending</option>
          <option value="progress">In progress</option>
          <option value="Uploaded">Uploaded</option>
        </select>


      </div>



        <div className="relative">
          <ArrowUpDown
            size={15}
            className="absolute left-3 top-1/2 text-[#8A8175] -translate-y-1/2"
          />

          <select className="bg-[#1E1916] border border-[#2A2420] text-[#8A8175] rounded-2xl p-2 text-center  pl-3 ">
            <option value={""}> Sort : Newest</option>
            <option value="Pending">Sort : Oldest</option>
            <option value="progress">Sort : Most Viewed</option>
            <option value="Uploaded">Sort : Least Viewed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between px-30 pb-5 border-b-3 border-[#1E1D1B] mt-7">

    <div>
    <span className="text-[#8A8175] text-xs font-bold">TITLE</span>
      </div>



      <div className="flex gap-15 text-[#8A8175] text-xs font-bold">
      <span>VIEWS</span>
      <span>DATE</span>
      <span>STATUS</span>
      <span>ACTIONS</span>
      </div>



      </div>

    <div>
    {
      videosData?.map((item)=>{

        return <VideoCard data={item}/>

      })
      
   
    }
  

    </div>



      {videos.data?.data?.map((item, idx) => {
        return (
          <div>
            <video
              width={500}
              height={300}
              className="rounded-md"
              autoPlay
              controls
            >
              <source src={item.cloudinary_public_url}></source>
            </video>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default YourVideos;
