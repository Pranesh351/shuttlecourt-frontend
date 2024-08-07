import {popCenter} from "../component/PopUp"
import useAuthContext from "../Hooks/useAuthContext";
import useCreateSubscription from "../Hooks/useCreateSubscription"
import useSubscriptionContext from "../Hooks/useSubscriptionContext";
import Login from "../pages/login";
import starter from "../appFiles/starter.jpg"
import pro from "../appFiles/pro.jpg";
import premium from "../appFiles/premium.jpg";

const SubscriptionPack = () => {
    const {subscription}= useSubscriptionContext();
    const {user}=useAuthContext();
    const {isLoading, error, createSubscription, info, setInfo}=useCreateSubscription();
    const handleClick=(e,data)=>{
        e.preventDefault();
        createSubscription(data.name, data.discription, data.price, data.startTime, data.days, data.duration, data.offer);
    }
    const pack=[
        {
            img: starter,
            name:'Starter', 
            discription:'8hrs/Month Free|25% offer on bookings|One Month Validity|Limitted Access',
            price:400,
            startTime:new Date().toLocaleString(),
            days:28,
            duration:8,
            offer:25

        },
        {
            img: pro,
            name:'Pro',
            discription:'2hrs/Day Limit|60hrs/Month Free|30% offer on bookings|1 Month Validity',
            price:800,
            startTime:new Date().toLocaleString(),
            days:30,
            duration:60,
            offer:30

        },
        {
            img: premium,
            name:'Premium',
            discription: '750hrs/Year Free|50% offer on bookings|1 Year Validity|Cork included',
            price:8000,
            startTime:new Date().toLocaleString(),
            days:365,
            duration:750,
            offer:50

        }
    ]

    return ( 
        <div className="totalSubscription">
            <h2 className="subTopic">Subscriptions</h2>
            <div className="subscriptions" >{
                pack.map((ele)=>{
                    return <div className="subscription">
                        <img src={ele.img}/>
                        <div className="subscriptionCard">
                            <h3>{ele.name}</h3>
                            {ele.discription.split('|').map((dis)=><p>{dis}</p>)}
                            {popCenter(<button disabled={user && subscription && subscription.length===1}>Choose</button>, 
                            <div className="popupContent">  
                                {user && !info && subscription && subscription.length===0 && <div>
                                            <div>{ele.price} rupees</div>
                                            {error&&<div>{error}</div>} 
                                            <button onClick={(e)=>handleClick(e, ele)}disabled={isLoading}>Pay</button>
                                </div>}
                                {user && !info && (!subscription || subscription && subscription.length!==0) && <div>
                                            <div>You already have a subscription!!!</div>
                                </div>}

                                {user && info && <div>{info}</div>}

                                {!user && <Login/>}
                            </div> ,
                            ()=>"" ,()=>setInfo(null))}
                        </div>
                    </div>
                })
            }</div>
        </div>
     );
}
 
export default SubscriptionPack;