import { Link } from "react-router-dom";

const Support = () => {
    const contentInfo=[
        {topic:"Booking Related",content:"Booking only available for that particular day. Slots are allowed to booked only before the slot time. A slot capacity is limited to 4. Incase of 0 availabillity of slot you are not allowed to book that slot."},
        {topic:"Cancelation Related",content:"Cancelation of booked slot is allowed till before 30 min of the slot time. On cancelation 2% will be deducted from your payment amount. In case of slot availed subscription free Hrs it will be returned."}
    ];

    const contentQueries=[
        {question:'Unable to login?', answer:"If already does'nt have an account. Please try to signup first. Please do check if you have entered correct mail-id and password. Incase forget your password please click forget password in login page to change new."},
        {question:'Unable to book slot?', answer:"Slots cant be booked after the actual time of te particular slot. If you are unable to book slot which is greater than actual time, please contact us."},
        {question:'Unable to cancel slot?', answer:'Booked slots are only allowed to cancel before 30 min of slot time. In this case 2% of actual amout paid by you will be deducted as a service tax.'},
        {question:'Want to know more about cancelation chages?', answer:"2% from your actual pay amound will be deducted as a service tax. If the slot was availed via free hour's from subscription the hour's will be retained."},
        {question:'Web page not responding?', answer:'This may be occured due to web page maintanace. Please Contact us via office location or virtually if you need any help.'},
        {question:'Want to book slot for selective date?', answer:'Currently we are not providing that kind of features. Please try to book slot on a particular day. In future we will consider binging this functionality.'}
    ];
    return ( <div className="support">
        <div className="supportTop">
            <div className="supportHeader">
                <h1>Need help?<br/>You are in the right place.</h1>
                <p>Pick from the below cards to find advice and answers from the PlayCard team.</p>
            </div>
            <div className="supportInfo">
                {contentInfo.map((ele)=>{
                    return <div>
                        <h2>{ele.topic}</h2>
                        <p>{ele.content}</p>
                    </div>
                })}
            </div>
        </div>
        <div className="supportQA">
            <h1>Frequently asked questions</h1>
            <div>
                {contentQueries.map((ele)=>{
                    return <div>
                        <h2>{ele.question}</h2>
                        <p>{ele.answer}</p>
                    </div>
                })}
            </div>
        </div>
        <div className="supportFooter">
            <h2>For more queries</h2>
            <Link to="/contact"><button>Contact us</button></Link>
        </div>
    </div> );
}
 
export default Support;