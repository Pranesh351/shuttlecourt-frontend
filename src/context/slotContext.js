import {createContext, useReducer, useEffect} from "react";

export const slotContext= createContext();

const slotReducer= (state, action)=>{
    switch(action.type){
        case 'SET SLOT': return {slot: action.payload};
        case 'CREATE SLOT': return {slot:[action.payload, ...state.slot]};
        case 'UPDATE SLOT': return {slot: state.slot.map(element=>{
            console.log(action.payload);
            if(element._id === action.payload.id){
                return element= {...element, ...action.payload};
            }
            return element;
        })};
        case 'DELETE SLOT': return{slot: state.slot.filter(element=>element._id!==action.payload.id)}
        default: return state;
    }
}

const SlotProvider = ({children}) => {
    const [state, dispatch]= useReducer(slotReducer, {slot: null});
    useEffect(()=> 
        async()=>{
            const response= await fetch(process.env.REACT_APP_URL+'/api/slot',{ method:"GET" });
            const json=await response.json();

            if(response.ok){
                dispatch({type:"SET SLOT", payload:json});
            }
        }
        , []);

        
    
    return ( 
        <slotContext.Provider value={{...state, dispatch}}>
            {children}
        </slotContext.Provider>
     );
}
 
export default SlotProvider;