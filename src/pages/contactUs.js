import contact from "../appFiles/contact.jpg";
import virtual from "../appFiles/virtual.png";
import office from "../appFiles/office.png";
const Contact = () => {
    return ( <div className="contact" style={{backgroundImage: `url(${contact})`, backgroundSize: "cover", backgroundRepeat:"no-repeat"}}>
            <h1>Contact us</h1>
            <span className="contactSub">
                <div>
                    <img src={office}></img>
                    <h3>To reach out to office location</h3>
                    <p>PlayCard Shuttle Court, Abcd Bulding, Xyz Street,<br/>HijkLmnop, India.</p>
                    <button>Map Location</button>
                </div>
                <div>
                    <img src={virtual}></img>
                    <h3>To contact as via social media</h3>
                    <p>Name: Pranesh RP, MailId:<a href="mailto:pran18me063@rmkcet.ac.in">pran18me063@rmkcet.ac.in</a>,<br/> Linkedin:<a href="https://www.linkedin.com/in/pranesh-r-p">Pranesh R.P</a>, Phone No: +91- XXX-XXX-XXXX.</p>
                    <a href="https://www.linkedin.com/in/pranesh-r-p"><button>Chat in Linkedin</button></a>
                </div>
            </span>
    </div> );
}
 
export default Contact;