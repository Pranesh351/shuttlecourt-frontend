import {Link} from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import useAuthContext from "../Hooks/useAuthContext";
import useSubscriptionContext from "../Hooks/useSubscriptionContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Kebab from '../appFiles/Kebab.png';
import Brand from "../appFiles/Brand.png";
import standard from "../appFiles/standard.png";
import Starter from "../appFiles/starter.png";
import Pro from "../appFiles/pro.png";
import Premium from "../appFiles/premium.png"
import hamburger from "../appFiles/hamburger.png";

const NavBar = ({setReset}) => {
    const {subscription}= useSubscriptionContext();
    const {user}= useAuthContext();
    const {logout}= useLogout();
    const handleClick=()=>logout();
    const handleLogin=(close)=>{ setReset(false); close();}
    const allLogo={Starter:Starter, Pro:Pro, Premium:Premium}
    const logo= !subscription || (subscription && subscription.length!=1) ? standard : allLogo[subscription[0].name];

    return ( 
        <header className={user ? "navbarLogin" : "navbarLogout"}>
        {<Link to="/" className="navBrand" ><span style={user?{color:'rgb(10, 67, 19)'}:{color:'black'}}><img src={Brand}></img>PlayCard<sub>&reg;</sub>
        </span></Link>}
        <div>
            {user ? <>
                        <div className="comNav">
                            <Link to="/">Home</Link>
                            <Link to="/subscriptions" className="close">Pricing</Link>
                            <Link to="/userDetails" className="close">Treasury</Link>
                            {<Popup trigger={<span className="emailLogo">{user.email.substring(0,2)}</span>} position="bottom right">
                                {close => {
                                        return <div id="popup" className="navPopupLogin">
                                                    {<>
                                                        <img src={logo}></img>
                                                        <span className="userName" style={{color:"Brown"}}>{user.email.split('@')[0]}</span>
                                                        <hr style={{width:"75%"}}/>
                                                        <Link to="/support" onClick={close}>Support</Link>
                                                        <Link to="/contact" onClick={close}>Contact Us</Link>
                                                        <button onClick={handleClick}><span onClick={close}>Log Out</span></button>
                                                    </>}
                                                </div>
                                    }
                                }
                            </Popup>}
                        </div>
                        
                        <div className="mobNav">
                            {<Popup trigger={<span className="emailLogoMob">{user.email.substring(0,2)}</span>} position="bottom right">
                                {close => {
                                        return <div id="popup" className="navPopupLogin">
                                                    {<>
                                                        <img src={logo}></img>
                                                        <span className="userName" style={{color:"Brown"}}>{user.email.split('@')[0]}</span>
                                                        <hr style={{width:"75%"}}/>
                                                        <Link to="/" onClick={close}>Home</Link>
                                                        <Link to="/subscriptions" onClick={close}>Pricing</Link>
                                                        <Link to="/userDetails" onClick={close}>Treasury</Link>
                                                        <Link to="/support" onClick={close}>Support</Link>
                                                        <Link to="/contact" onClick={close}>Contact Us</Link>
                                                        <button onClick={handleClick}><span onClick={close}>Log Out</span></button>
                                                    </>}
                                                </div>
                                    }
                                }
                            </Popup>}
                        </div>
                    </>
            :<>
                <div className="comNav">
                    <Link to="/">Home</Link>
                    <Link to="/subscriptions" className="close">Pricing</Link>
                    <Link to="/features" className="close">Features</Link>
                    <Link to="/contact" className="close">Contact</Link>
                    <Link to="/about" className="close">About</Link>
                    {<Popup trigger={<img src={Kebab} className="kebab"></img>} position="bottom right">
                        {close => {
                                return <div id="popup" className="navPopupLogoff">
                                            {<>
                                                <Link to="/support" onClick={close}>Support</Link>
                                                <Link to="/login" onClick={(close)=>handleLogin()} className="login">Sign In</Link>
                                                <Link to="/signup" onClick={close}><button>Try Free</button></Link>
                                            </>}
                                        </div>
                            }
                        }
                    </Popup>}
                </div>
                <div className="mobNav">
                    {<Popup trigger={<img src={hamburger} className="hamburger"></img>} position="bottom right">
                        {close => {
                                return <div id="popup" className="navPopupLogoff">
                                            {<>
                                                <Link to="/" onClick={close}>Home</Link>
                                                <Link to="/subscriptions" onClick={close}>Pricing</Link>
                                                <Link to="/features" onClick={close}>Features</Link>
                                                <Link to="/contact" onClick={close}>Contact</Link>
                                                <Link to="/about" onClick={close}>About</Link>
                                                <Link to="/support" onClick={close}>Support</Link>
                                                <Link to="/login" onClick={(close)=>handleLogin()} className="login">Sign In</Link>
                                                <Link to="/signup" className="signup" onClick={close}><button>Try Free</button></Link>
                                            </>}
                                        </div>
                            }
                        }
                    </Popup>}
                </div>
            </>}
        </div>
        </header>
     );
}
 
export default NavBar;