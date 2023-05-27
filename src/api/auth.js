import axios from "axios"



var BASE_URL="https://relevel-crm-be.herokuapp.com/"

export  function createuser(data)
{
    
        
        var response= axios.post(`${BASE_URL}crm/api/v1/auth/signup`,data)
        // console.log(response)
        return response

    
        
     


}

export  function loginuser(data)
{
     
        
        var response= axios.post(`${BASE_URL}crm/api/v1/auth/signin`,data)

        return response

     


}


