import { useEffect, useState } from "react";
import {popCenter} from "../component/PopUp"
import useCreateSlot from "../Hooks/useCreateSlot";
import useAuthContext from "../Hooks/useAuthContext";
import SlotAvailability from "../Hooks/useSlotAvailabity";
import useSlotContext from "../Hooks/useSlotContext";
import useSubscriptionContext from "../Hooks/useSubscriptionContext";
import Login from "../pages/login";
import refresh from "../appFiles/refresh.png"

export const timeValue=[6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];

const SlotTime = () => {

    const {user}=useAuthContext();
    const {subscription}=useSubscriptionContext();
    const slot=useSlotContext();
    const price=100;
    var dur=[1,2];
    const court=[1,2,3,4];
    const [time, setTime]=useState(new Date().getHours());
    const [availabilityStatus, setAvailabilityStatus]=useState(null);
    const [switchPopup, setSwitchPopup]= useState(false);
    const [courtNo, setCourtNo]= useState(1);
    const [from, setFrom]= useState();
    const [person, setPerson]= useState(1);
    const [duration, setDuration]= useState(1);
    const {isLoading, error, createSlot, info, setInfo, setError}= useCreateSlot();
    const {availability, personOption, slotAvailability}=SlotAvailability(timeValue, court, from, duration, courtNo);
    const durCondition=(from==timeValue[timeValue.length-1]|| 
        timeValue[timeValue.indexOf(Number(from))+1]!=Number(from)+1 || 
        availability && availability[courtNo-1][timeValue.indexOf(Number(from))+1]===0);
    const [slotCost, setSlotCost]=useState(0);
    const [slotAvailHrs, setSlotAvailHrs]=useState(0);
    const [subscriptionAvailHrs, setSubscriptionAvailHrs]=useState(0);
    const handleRefresh=async()=>{
        const response= await fetch(process.env.REACT_APP_URL+'/api/slot',{ method:"GET" });
            const json=await response.json();

            if(response.ok){
                slot.dispatch({type:"SET SLOT", payload:json});
            }
    };

    useEffect(()=>{
        if(subscription&&subscription.length===1){
            setSlotAvailHrs(subscription[0].duration>0 ? person*duration<subscription[0].duration ? person*duration : subscription[0].duration:0);
            setSlotCost((slotAvailHrs===0 ? (person*duration*price*(100-subscription[0].offer))/100 : 
                    ((person*duration-slotAvailHrs)*price*(100-subscription[0].offer))/100));
            setSubscriptionAvailHrs(subscription[0].duration===0 ? 0: subscription[0].duration-slotAvailHrs);
        }else{
            setSlotCost(person*duration*price);
        }
    },[from, person, court, duration])

    
    useEffect(()=>{
        setTime(new Date().getHours())
    },[from, duration, court, person])

    useEffect(()=>{
        if(durCondition){
            setDuration(1);
        }
    },[from])

    const handleClick= async(from, duration, courtNo, person, slotCost, slotAvailHrs, subscriptionAvailHrs)=>{ 
        if(Number(from)>timeString()){
            const response= await fetch(process.env.REACT_APP_URL+'/api/slot',{ method:"GET" });
            const json=await response.json();

            if(response.ok){
                slot.dispatch({type:"SET SLOT", payload:json});
                if(slotAvailability(from, person, courtNo, duration, availability, timeValue)){
                    if(duration>1){
                        const end= Number(from)+Number(duration);
                        createSlot(from+' to '+end, duration, courtNo, person, slotCost, slotAvailHrs, subscriptionAvailHrs);
                    }else{
                        createSlot(from, duration, courtNo, person, slotCost, slotAvailHrs, subscriptionAvailHrs);
                    }
                }else{
                    setAvailabilityStatus("Selected time slot does not contain expected availability. Please Select another time slot.");
                }
            }
        }else{
            setAvailabilityStatus("Seleted slot exceeded its booking time limit. Please try another slot");
        }
        setTime(new Date().getHours());
        
        
    };

    const timeDisplay=timeValue.map((val, ind)=>{
        const ele=(val>11 && val<24) ? "PM" : "AM";
        const dis=val>12 ? val-12 : val;

        if(dis<10){return "0"+dis+".00 "+ele}
        else {return dis+".00 "+ele}
    })

    useEffect(()=>{setFrom("null")}, [courtNo])

    const slotForm= ()=>{ 
        return <div className="card">
            {user && 
                <form onSubmit={(e)=>e.preventDefault()}>
                {!switchPopup && 
                <div className="slotForm">
                    <label>
                        <h4>From</h4><br/>
                        <select value={from} onChange={(e) => setFrom(e.target.value)}>
                            <option value="null">Select Time</option>
                            {availability && timeDisplay.map((val, ind)=>{
                            return <option value={timeValue[ind]} disabled={availability[courtNo-1][ind]===0 || timeValue[ind]<=Number(time)}>{val}</option>
                        })}
                        </select>    
                    </label><br/>

                    <label>
                        <h4>Person</h4><br/>
                        <select value={person} onChange={(e) => setPerson(e.target.value)} 
                        disabled={personOption && personOption===0 ? true : false}>
                            {personOption && personOption.map((ele)=> <option value={ele}>{ele}</option>)}
                        </select>
                    </label><br/>

                    <label>
                        <h4>Court NO</h4><br/> 
                        <select value={courtNo} onChange={(e) => setCourtNo(e.target.value)}>
                            {court.map((ele)=> <option value={ele}>{ele}</option>)}
                        </select>
                    </label><br/>

                    <label>
                        <h4>Duration</h4><br/> 
                        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                            {durCondition && <option value={1}>1Hrs</option>}
                            {!durCondition && dur.map((ele)=> <option value={ele}>{ele}Hrs</option>)}
                        </select>
                    </label><br/>

                    <button onClick={()=>{setSwitchPopup(true); setTime(new Date().getHours())}} 
                    disabled={personOption && personOption.length===1 && 
                    personOption[0]===0 || Number(from)<=time}>Book</button>
                </div>
                }

                {switchPopup && !info &&
                <div className="slotPrice">
                    <button disabled={isLoading} onClick={()=>{setSwitchPopup(false); setInfo(null); setError(null)}}>&lArr;</button>
                    {subscription && subscription.length===1 && <div>
                            <p>Price- {person*price*duration}</p>
                            {slotAvailHrs>0 && <p>Availed Free Hrs- {slotAvailHrs}</p>}
                            {slotAvailHrs===0 && <p>Offer- {subscription[0].offer}%</p>}
                            <p>Your Saving- {(person*price*duration)-slotCost}</p>
                            <h2>Your Price- {slotCost}</h2>
                        </div>
                    }
                    {!subscription || (subscription && subscription.length!==1) && <div>
                            <h3>Price- {person*price*duration}</h3>
                        </div>
                    }

                    {error&&<div>{error}</div>}
                    <button disabled={isLoading || Number(from)<=time} onClick={()=>handleClick(from, duration, courtNo, person, slotCost, slotAvailHrs, subscriptionAvailHrs)}>Pay</button>
                </div>
                }
                {availabilityStatus &&<div>{availabilityStatus}</div>}
                {info &&
                <p>{info}</p>
                }
            </form>
            }

            {!user && <Login/>}
        </div>
}


    return ( <div className= "slotTime">
        <h3>Book your Slots Now  <img src={refresh} onClick={handleRefresh}></img></h3>
            
            <label>
                Court NO 
                <select value={courtNo} onChange={(e) => setCourtNo(e.target.value)}>
                    {court.map((ele)=> <option value={ele}>{ele}</option>)}
                </select>
            </label><br/>

        <div className="slot">
            {time && console.log(time)}
            {timeValue&&console.log(timeValue)}
            {timeDisplay.map((val, ind)=>
                popCenter(<button disabled={!availability || availability[courtNo-1][ind]===0 || time>=timeValue[ind] ? true : false} >
                    <div>{val}{availability && <div>{availability[courtNo-1][ind]}/4</div>}</div>
                    </button>, slotForm(), ()=>setFrom(timeValue[ind]),()=>
                {
                    setInfo(null); 
                    setSwitchPopup(false);
                    setDuration(1);
                    setPerson(1);
                    setAvailabilityStatus(null);
                })
            )}
        </div>
     </div>);

}
 
export default SlotTime;