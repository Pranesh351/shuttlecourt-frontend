import { useState } from "react";
import useSignup from "../Hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
    const[email, setEmail]= useState();
    const[password, setPassword]= useState();
    const{isLoading, error, signup}= useSignup();

    const handleSubmit=(e)=>{ e.preventDefault();   signup(email, password);};

        return (<div className="card">
                    <form onSubmit={handleSubmit}>
                        <h3>Sign UP</h3>
                        <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <label className="checkBoxSignup"><input type="checkbox" required/> Agree to terms and conditions</label><br/>
                        <button disabled={isLoading}>Register</button><br/>
                        {error && <div className="signInError">{error}</div>}
                        <div className="signInLink">Already a user? <Link to="/login">Click Here</Link></div>
                    </form> 
                </div> 
    );
}
 
export default Signup;