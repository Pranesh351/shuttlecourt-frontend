import useSlotContext from "../Hooks/useSlotContext";
import useSubscriptionContext from "../Hooks/useSubscriptionContext";
import { timeValue} from "../component/SlotTime";
import { useState } from "react";
import { popCenter } from "../component/PopUp";
import useAuthContext from "../Hooks/useAuthContext";
import Starter from "../appFiles/starter.jpg"
import Pro from "../appFiles/pro.jpg";
import Premium from "../appFiles/premium.jpg";
import cancel from "../appFiles/cancel.png"
import Help from "../component/help";

const UserDetails = () => {
    const {user}=useAuthContext();
    const {subscription, dispatch}= useSubscriptionContext();
    const slots= useSlotContext();
    const compareByStartTime=(a, b)=>{
            if(a.startTime.length>2){
                a=Number(a.startTime.split(' to ')[0]);
            }else{
                a=Number(a.startTime);
            }

            if(b.startTime.length>2){
                b=Number(b.startTime.split(' to ')[0]);
            }else{
                b=Number(b.startTime);
            }
            return a-b;
        }
    const slot=slots && slots.slot ? slots.slot.sort(compareByStartTime):null;
    const timeString=()=>Number(new Date().toLocaleString().split(" ")[2]==="pm" && new Date().toLocaleString().split(" ")[1].split(":")[0]!=="12" ? Number(new Date().toLocaleString().split(" ")[1].split(":")[0])+12 : new Date().toLocaleString().split(" ")[1].split(":")[0]);
    const [time, setTime]=useState(timeString());
    const timeDisplay=timeValue.map((val, ind)=>{
        const ele=(val>11 && val<24) ? "PM" : "AM";
        const dis=val>12 ? val-12 : val;
        if(dis<10){return "0"+dis+".00 "+ele}
        else {return dis+".00 "+ele}
    })
    const [slotCount, setSlotCount]= useState(0);
    const addDays=() =>{
        const newDate = new Date(subscription[0].startTime.split('/')[1]+"/"+subscription[0].startTime.split('/')[0]+"/"+subscription[0].startTime.split('/')[2].split(',')[0]);
        newDate.setDate(newDate.getDate() + subscription[0].days - 1); 
        return newDate.toDateString();
      }
    const cancelationLimit=(ele)=> Number(ele.startTime.length>2?ele.startTime.split(' to ')[0]:ele.startTime)-0.7<Number(new Date().getHours()+"."+new Date().getMinutes());
    const[isLoading, setIsloading]= useState(false);
    const[error, setError]= useState(null);
    const[info, setInfo]= useState(null);
    const subscriptionImg={Starter:Starter, Pro:Pro, Premium:Premium};

    const handleClick=async(ele)=>{
        const deleteID=ele._id;
        if(!(Number(ele.startTime.length>2?ele.startTime.split(' to ')[0]:ele.startTime)-0.7<Number(new Date().getHours()+"."+new Date().getMinutes()))){
            setIsloading(true);
            setError(null);

            if(subscription && subscription.length>0 && ele.availedFreeHrs>0){
                const res= await fetch(process.env.REACT_APP_URL+"/api/subscription/"+subscription[0]._id, {
                    method:"PATCH",
                    headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${user.token}`},
                    body:JSON.stringify({duration:subscription[0].duration+ele.availedFreeHrs})
                })
                const Json= await res.json();
                
                if(!res.ok){
                    setError(Json.error);
                    setIsloading(false);
                }
                if(res.ok){
                    dispatch({type:'UPDATE SUBSCRIPTION',payload:{id:subscription[0]._id, duration:subscription[0].duration+ ele.availedFreeHrs}});
                    const response= await fetch(process.env.REACT_APP_URL+"/api/slot/"+ele._id,{
                        method:"DELETE", 
                        headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`}
                    })
                    const json= await response.json()
            
                    if(!response.ok){
                        setError(json.error);
                        setIsloading(false);
                    }
            
                    if(response.ok){
                        slots.dispatch({type:'DELETE SLOT', payload:{id:deleteID}})
                        setIsloading(false);
                        if(ele.cost>0){
                            setInfo("Slot has been sucessfully Canceled, Service Tax 4% will be deducted from your slot amount rupees "+ele.cost+" .And "+(ele.cost*(100-4))/100+" rupees will be creadited to you bank account with in next 5 bussiness days. Thank you");
                        }else{
                            setInfo("Slot has been sucessfully Canceled, Thank You");
                        }
                        
                    }
                }
            }else{
                const response= await fetch(process.env.REACT_APP_URL+"/api/slot/"+ele._id,{
                    method:"DELETE", 
                    headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`}
                })
                const json= await response.json()
        
                if(!response.ok){
                    setError(json.error);
                    setIsloading(false);
                }
        
                if(response.ok){
                    slots.dispatch({type:'DELETE SLOT', payload:{id:deleteID}});
                    setIsloading(false);
                    setInfo("Slot has been sucessfully Canceled, Service Tax 4% will be deducted from your slot amount rupees "+ele.cost+". And "+(ele.cost*(100-4))/100+" rupees will be creadited to you bank account with in next 5 bussiness days. Thank you");
                }
            }
        }else{
            setError("You cancelation request cannot be accepted. Here on please try to cancel before 30 mins of your slot time. Thank You")
        }
    };

    const confirmPopup= (ele)=><div>
        {!info && !error && <div>
            <h2>Are you sure?</h2>    
            <p>Are you sure you want to cancel this slot? This action cannot be undone.</p>
            <button onClick={(e)=>handleClick(ele)} disabled={isLoading}>Yes</button>
        </div>}
        {error && <div>{error}</div>}
        {info && <div>{info}</div>}
    </div>

    return ( <div>
        <div>
            <h2 className="subTopic">Subscription Details</h2>
            {subscription && subscription.length===0 && <div className="noSubCard">No subscription Available</div>}
            {!subscription && <div className="noSubCard">No subscription Available</div>}
            {subscription && subscription.length>0 && subscription.map((ele)=>
                <div className="availedSubscription">
                    <img src={subscriptionImg[ele.name]}></img>
                        <div className="subCard">
                        <h3>{ele.name}</h3>
                        <p>Free: {ele.duration} Hrs</p>
                        <p>Offer: {ele.offer} %</p>
                        <p>Validity: {ele.days} days</p>
                        <p>Valid Till: {addDays()}</p>
                    </div>
                </div>)}
        </div>

        <div className="mySlot">
            <h2>My Slots</h2>
            {info && <p style={{color:"green", width:"700px", backgroundColor:"white", boxShadow:"0.5px 0 5px rgba(0, 0, 0, 0.084)", borderRadius: "7px", margin:"auto"}} className="slotP">{info}</p>}
            {error && <p style={{color:"red", width:"700px", backgroundColor:"white", boxShadow:"0.5px 0 5px rgba(0, 0, 0, 0.084)", borderRadius: "7px", margin:"auto"}} className="slotP">{error}</p>}
            {slotCount===0 && <p>No slots had been booked</p>}
            {!slot && <p>No slots had been booked</p>}
            {slot && <div className="slotCard">
                {slot.map((ele)=>{
                if(Number(ele.startTime.length>2?ele.startTime.split(' to ')[0]:new Array (1).fill(ele.startTime)[0])>=time){
                    const display=()=>{
                        const timeArr=ele.startTime.length>2?ele.startTime.split(' to '):new Array (1).fill(ele.startTime);
                        if(timeArr && timeArr.length===2){
                            return timeDisplay[timeValue.indexOf(Number(timeArr[0]))]+" to "+timeDisplay[timeValue.indexOf(Number(timeArr[1]))];
                        }else{
                            return timeDisplay[timeValue.indexOf(Number(timeArr[0]))];
                        }
                    }
                    if(slotCount===0){setSlotCount(1);}
    
                    return <div className="subSlot">
                            {slot && slot.length>0 && <div>
                            <div className="subSlotHeader">
                                <h4>{display()}</h4>
                                {popCenter(<span>{!cancelationLimit(ele) && <img src={cancel}></img>}</span>,<div className="popupContent">{confirmPopup(ele)}</div>,()=>{
                                    setInfo(null);
                                    setError(null);
                                },()=>'')}
                            </div>
                            <div className="subSlotContent">
                                <p>Court No: {ele.court}</p>
                                <p>Person: {ele.person}</p>
                                <p>Duration: {ele.duration}</p>
                            </div>
                            </div>}
                        </div>
                }
            })}</div>}
        </div>
        <Help/> 
    </div> );
}
 
export default UserDetails;