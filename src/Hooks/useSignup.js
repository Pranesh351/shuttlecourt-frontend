import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useSlotContext from "./useSlotContext";

const useSingnup = () => {
    const slots=useSlotContext();
    const{dispatch}= useAuthContext();
    const[isLoading, setIsLoading]= useState();
    const[error, setError]= useState();

    const signup= async (email, password)=>{
        setIsLoading(true);
        setError(null);

        const response= await fetch(process.env.REACT_APP_URL+"/api/user/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email, password})
        })
        const json= await response.json();

        if(!response.ok){setError(json.error); setIsLoading(false);}
        if(response.ok){
            dispatch({type:"LOGIN", payload:json});
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
            const resp= await fetch(process.env.REACT_APP_URL+'/api/slot',{ method:"GET" });
            const jSon=await resp.json();

            if(resp.ok){
                slots.dispatch({type:"SET SLOT", payload:jSon});
            }
        }
    }
    
    return { isLoading, error, signup };
}
 
export default useSingnup;