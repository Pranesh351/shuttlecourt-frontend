import {useContext} from "react";
import {authContext} from "../context/authContext";

const useAuthContext = () => {
    const context = useContext(authContext);
    if(!context){
        throw Error("Cant use useAuthContext hook outside the authContextProvider");
    }
    return ( context );
}
 
export default useAuthContext;