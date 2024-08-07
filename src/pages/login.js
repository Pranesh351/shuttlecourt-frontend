import { useState } from "react";
import useLogin from "../Hooks/useLogin";
import useResetPassword from "../Hooks/useResetPassword";
import { Link } from "react-router-dom";

const Login = ({reset, setReset}) => {
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();
    const [ConfirmPassword, setConfirmPassword]= useState();
    const loginContent= useLogin();
    const resetContent= useResetPassword();
    const [error, setError]=useState(false);

    const handleSubmit= (e)=>{ 
        e.preventDefault(); 
        if(!reset){
            loginContent.login(email, password);
        }else if(reset && password!==ConfirmPassword){
            setError("Password does not match");
        }else{
            resetContent.resetPassword(email, password);
        }
    }


    return ( 
        <div className="card">
            {!reset && 
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>Log In</h3>
                    <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <div onClick={(e)=>{ e.preventDefault(); setReset(true); }} className="forgetPassword">forget password?</div>
                    <label className="checkBox"><input type="checkbox" className="check"/>Remember Me</label><br/>
                    <button disabled={loginContent.isLoading}>Log In</button>
                    {loginContent.error && <div className="signInError">{loginContent.error}</div>}
                    <div className="signInLink">Don't have an account? <Link to="/signup">Create One</Link></div>
                </form>
            </div>}

            {reset && !resetContent.info && 
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>Reset Password</h3>
                    <input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password " onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <button disabled={resetContent.isLoading}>Reset</button>
                    {error && <div className="error">{error}</div>}
                    {resetContent.error && <div className="signInError">{resetContent.error}</div>}
                </form>
            </div>}

            {resetContent.info && <div className="loginInfo">{resetContent.info}</div>}
        </div>
    );
}
 
export default Login;