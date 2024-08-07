import useAuthContext from "./useAuthContext";

const useLogout = () => {
    const{dispatch}=useAuthContext();

    const logout= async()=>{

        localStorage.removeItem('user');

        await dispatch({type:"LOGOUT"});

        window.location.href = '/login'
    }
    return { logout };
}
 
export default useLogout;