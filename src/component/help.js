import help from "../appFiles/help.png";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

const Help = () => {
    return ( <>
                {<Popup trigger={<img src={help} className='help'></img>} position="left top">
                    {close => {
                            return <div id="popup" className="helpPopup">
                                        {<>
                                            <Link to="/support" onClick={close}>Support</Link>
                                            <Link to="/contact" onClick={close}>Contact</Link>
                                        </>}
                                    </div>
                        }
                    }
                </Popup>}
            </>
     );
}
 
export default Help;