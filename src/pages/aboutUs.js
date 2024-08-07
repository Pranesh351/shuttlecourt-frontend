import linkedin from "../appFiles/linkedin.png";
import gmail from "../appFiles/gmail.png";
import developer from "../appFiles/developer.jpg"
import Help from "../component/help";

const About = () => {
    return ( <div className="about">
        <div className="aboutContent">
            <h1>ABOUT US</h1>
            <p>This Website is developed by Pranesh RP.<br/>This Website is completly build and designed from scratch by using MERN stack. And bult by refering to online resource with his brother's guidence.<br/> The intension to buld this web application is to explore more on his curiosity around Mern Stack. Thanks for your support.</p>
            <a href="https://www.linkedin.com/in/pranesh-r-p"><button>Know More</button></a>
            <div>
                <a href="https://www.linkedin.com/in/pranesh-r-p"><img src={linkedin}></img></a>
                <a href="mailto:pran18me063@rmkcet.ac.in"><img src={gmail}></img></a>
            </div>
        </div>
        <div>
            <img src={developer}></img>
        </div>
        <Help/>
    </div> );
}
 
export default About;