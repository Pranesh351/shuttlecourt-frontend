import { useContext } from "react";
import {subscriptionContext} from "../context/subscriptionContext";

const useSubscriptionContext = () => {
    const context= useContext(subscriptionContext);
    if(!context){
        throw Error('useSubscriptionContext cannot be use outside of subscriptionContextProvider');
    }
    return ( context );
}
 
export default useSubscriptionContext;