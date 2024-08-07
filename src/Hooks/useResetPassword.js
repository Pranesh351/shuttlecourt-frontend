import { useState } from "react";

const useResetPassword = () => {
    const [isLoading, setIsLoading]= useState();
    const [error, setError]= useState();
    const [info, setInfo]= useState(false);

    const resetPassword=async(email, password)=>{
        setIsLoading(true);
        setError(null);

        const response= await fetch("api/user/changepassword",{
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email, password})
        })

        const json=await response.json();

        if(response.ok){setIsLoading(false);    setInfo(json);}

        if(!response.ok){setError(json.error);  setIsLoading(false);}
    };
    
    return ( {isLoading, error, resetPassword, info} );
}
 
export default useResetPassword;