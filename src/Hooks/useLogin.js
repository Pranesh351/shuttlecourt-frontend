import {useState} from "react";
import useAuthContext from "./useAuthContext";
import useSubscriptionContext from "./useSubscriptionContext";
import useSlotContext from "./useSlotContext";

const useLogin = () => {
    const subscriptions=useSubscriptionContext();
    const slots=useSlotContext();
    const{dispatch}=useAuthContext();
    const[error, setError]=useState();
    const[isLoading, setIsLoading]=useState();
    const login=async(email, password)=>{
        setIsLoading(true);
        setError(null);

        const response= await fetch("api/user/signin",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email, password})
        })

        const json= await response.json();
        
        if(!response.ok){setError(json.error); setIsLoading(false);}
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json));
            dispatch({type:'LOGIN', payload:json});
            setIsLoading(false);

            const res= await fetch('/api/subscription',{ 
                method:"GET", 
                headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${json.token}`} 
            });
            const Json=await res.json();

            if(res.ok && subscriptions){
                subscriptions.dispatch({type:"SET SUBSCRIPTION", payload:Json});
            }

            const resp= await fetch('/api/slot',{ method:"GET" });
            const jSon=await resp.json();

            if(resp.ok){
                slots.dispatch({type:"SET SLOT", payload:jSon});
            }
        }
    };

    return {error, isLoading, login};
}
 
export default useLogin;