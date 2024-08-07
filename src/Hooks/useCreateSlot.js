import useSlotContext from './useSlotContext';
import useAuthContext from './useAuthContext';
import {useState} from "react";
import useSubscriptionContext from './useSubscriptionContext';

const useCreateSlot = () => {
    const {user}=useAuthContext();
    const {subscription}=useSubscriptionContext();
    const subContext= useSubscriptionContext();
    const{dispatch}=useSlotContext();
    const[error, setError]=useState(null);
    const[isLoading, setIsLoading]=useState(false);
    const[info, setInfo]= useState(null);
    const createSlot=async(startTime, duration, court, person, cost, availedFreeHrs, subFreeHrs)=>{
        setIsLoading(true);
        setError(null);

        const response= await fetch("api/slot/create",{
            method:'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
            body:JSON.stringify({startTime, duration, court, person, cost, availedFreeHrs})
        })

        const json= await response.json();
        
        if(!response.ok){setError(json.error); setIsLoading(false);}
        if(response.ok){
            dispatch({type:'CREATE SLOT', payload:json});
            if(subscription && subscription.length>0 && subscription[0].duration>0){
                const resp= await fetch("api/subscription/"+subscription[0]._id,{
                    method:'PATCH',
                    headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
                    body:JSON.stringify({duration:subFreeHrs})
                })
                const jason= await resp.json();

                if(!response.ok){setError(jason.error); setIsLoading(false);}
                if(response.ok){
                    subContext.dispatch({type:'UPDATE SUBSCRIPTION', payload:{"duration":subFreeHrs, "id":subscription[0]._id}});
                    setInfo("Sucessfully Booked")
                    setIsLoading(false);
                }
            }else{
                setInfo("Sucessfully Booked");
                setIsLoading(false);
            }
            
        }
    };

    return {error, isLoading, createSlot, info, setInfo, setError};
}
 
export default useCreateSlot;