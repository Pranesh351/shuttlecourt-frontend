import { useContext } from "react";
import {slotContext} from "../context/slotContext";
const useSlotContext = () => {
    const context= useContext(slotContext);
    if(!context){
        throw Error('useSlotContext cant be used outside useSlotProvider');
    }

    return ( context );
}
 
export default useSlotContext;