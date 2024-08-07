import linkedin from "../appFiles/linkedin.png";
import gmail from "../appFiles/gmail.png"
import { Link } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";

const Footer = () => {
    const {user}=useAuthContext();
    var year=new Date();
    year=year.getFullYear();

    return ( <div className="footer">
        <div className="footerContent">
            <div>
                <h2>Home</h2>
                <Link to="/">Home</Link>
                <Link to="/subscriptions">Pricing</Link>
                <Link to="/features">Features</Link>
                <Link to={user?"/userDetails":"/login"}>Treasury</Link>
            </div>
            <div>
                <h2>About us</h2>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
            <div>
                <h2>Get Help</h2>
                <Link to="/support">Support</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="footerIcon">
                <h2>Follow us</h2>
                <div>
                    <a href="https://www.linkedin.com/in/pranesh-r-p"><img src={linkedin}></img></a>
                    <a href="mailto:pran18me063@rmkcet.ac.in"><img src={gmail}></img></a>
                </div>
            </div>
        </div>
        <p>Copyright &#169; {year} PlayCard</p>
    </div> );
}
 
export default Footer;