import api from "./axios.js"


async function apiFetch(url,method,options = {}){


    try{
   const response = await api[method](url,options)
   return response;
}catch(err){
    


    if(err.response?.status === 401 && err.response?.data?.message == "unAuthorizedd"){
        try{
          const refreshResponse = await api.post("auth/api/generate-access");
              if(refreshResponse.data.success){
             return await api[method](url,options);
                }
            }catch(err){
                console.log(err);

            }




    }

  

}






}



export default apiFetch;