import court from "../appFiles/court.png";
import onlineBooking from "../appFiles/onlineBooking.png";
import visitorArena from "../appFiles/visitorArena.png";
import shower from "../appFiles/shower.png";
import parking from "../appFiles/parking.png";
import coach from "../appFiles/coach.png";
import Help from "../component/help";

const Features = () => {
    const content=[
        {img:court,header:'Court',paragraph:'Four courts are available with wooden flooring for more comfort'},
        {img:onlineBooking,header:'Online Booking',paragraph:'Online booking is available. Book your slots from your home'},
        {img:visitorArena,header:'Visitor Arena',paragraph:'Visitors Arena is available with air conditioning'},
        {img:shower,header:'Shower Area',paragraph:'Dressing rooms, Restrooms and Shower areas are available'},
        {img:parking,header:'Parking Area',paragraph:'Parking area is avialble with capacity of 20 cars and free of cost'},
        {img:coach,header:'Coaching',paragraph:'High class coaching staffs are avilable with flexible coaching time'}
    ]
    return ( <div className="features">
        <h1>FEATURES</h1>
        <p>Overview of our key features, that makes us your next vital shuttle court platform.</p>
        <div className="subFeatures">
            <h3>OUR FEAUTRES</h3>
            <span>
                {content.map((ele)=>{
                    return <div>
                        <img src={ele.img}></img>
                        <h4>{ele.header}</h4>
                        <p>{ele.paragraph}</p>
                    </div>;
                })}
            </span>
        </div>
        <Help/>
    </div> );
}
 
export default Features;