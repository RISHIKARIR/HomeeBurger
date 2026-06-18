import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../api/video.api";


export const useVideos = () => {
  return useQuery({
    queryKey : ["Your-Videos"],
    queryFn : getVideos,
    staleTime : 300000
  })
}








export default useVideos