import { createContext, useReducer, useEffect } from "react";

export const subscriptionContext= createContext();
const user= JSON.parse(localStorage.getItem('user'));

const subscriptionReducer = (state, action)=>{
    switch(action.type){
        case 'SET SUBSCRIPTION': return {subscription: action.payload};
        case 'CREATE SUBCRIPTION': return {subscription: [action.payload, ...state.subscription]};
        case 'UPDATE SUBSCRIPTION': return {subscription:state.subscription.map(element => {
            if(element._id == action.payload.id){
                return element={...element, ...action.payload};
            }else{
                return element;
            }
        })};
        case 'DELETE SUBSCRIPTION': return {subscription:state.subscription.filter((sub)=> sub._id !== action.payload.id)};
        default: return state;
    }
};


const SubscriptionProvider = ({children}) => {
    const [state, dispatch]= useReducer(subscriptionReducer,{subscription:null});
    useEffect(()=> 
        async()=>{
            if(user){
                const response= await fetch(process.env.REACT_APP_URL+'/api/subscription',{ 
                    method:"GET", 
                    headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`} 
                });
                const json=await response.json();
    
                if(response.ok){
                    dispatch({type:"SET SUBSCRIPTION", payload:json});
                }
            }
        }
        , []);
    return ( 
        <subscriptionContext.Provider value={{...state, dispatch}}>
            {children}
        </subscriptionContext.Provider>
     );
}
 
export default SubscriptionProvider;
