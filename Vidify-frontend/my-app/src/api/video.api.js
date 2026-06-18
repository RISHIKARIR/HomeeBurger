import apiFetch from "./apifetch"



export const getVideos = async ()=>{

const response = await apiFetch('api/videos/get-videos',"get")

return response.data;


}