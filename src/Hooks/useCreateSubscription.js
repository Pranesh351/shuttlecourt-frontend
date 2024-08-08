import useAuthContext from './useAuthContext';
import useSubscriptionContext from './useSubscriptionContext';
import {useState} from "react";

const useCreateSubscription = () => {
    const {user}=useAuthContext();
    const{dispatch}=useSubscriptionContext();
    const[error, setError]=useState(null);
    const[isLoading, setIsLoading]=useState(false);
    const [info, setInfo]= useState(null);
    const createSubscription=async(name, discription, price, startTime, days, duration, offer)=>{
        setIsLoading(true);
        setError(null);
        setInfo(null);

        const response= await fetch(process.env.REACT_APP_URL+"/api/subscription/create",{
            method:'POST',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`},
            body:JSON.stringify({name, discription, price, startTime, days, duration, offer})
        })

        const json= await response.json();
        
        if(!response.ok){setError(json.error); setIsLoading(false);}
        if(response.ok){
            dispatch({type:'CREATE SUBCRIPTION', payload:json});
            setIsLoading(false);
            setInfo("You had sucessfully subscriped to "+name+" Pack. Thank You, Enjoy Your Joy Ride with us !!!");
        }
    };

    return {error, isLoading, createSubscription, info, setInfo};
}
 
export default useCreateSubscription;