import useSlotContext from "./useSlotContext";
import { useState, useEffect } from "react";

const SlotAvailability = (timeValue,courtArr, from, duration, courtNo) => {
    const {slot}=useSlotContext();
    const [personOption, setPersonOption]= useState();
    const [availability, setAvailability]= useState(()=>{
        const availArr=[];
        for(var j=0; j<courtArr.length; j++){
            availArr[j]=[];
            for(var i=0; i<=timeValue.length; i++){
                availArr[j][i]=0;
            }
        }
        return availArr;
    });

    const getSlots=(time, court)=>{
        var personCount=0;
        if(slot && slot.length>0){
            for(var i=0; i<slot.length; i++){

                var startTime=slot[i].startTime.length<3 ? new Array(1).fill(Number(slot[i].startTime)) 
                : slot[i].startTime.split(' to ');
                if(startTime.length===1 && court===slot[i].court && startTime[0]===Number(time)){
                        personCount+=slot[i].person;
                }else if(court=== slot[i].court && (Number(time)===Number(startTime[0])
                        || (Number(time)>Number(startTime[0]) && Number(time)<Number(startTime[1]) ) ) )
                        {
                            personCount+=slot[i].person;
                }
                
                if(personCount>3){
                    personCount=0;
                    break;
                }
                
                if(i===slot.length-1){
                    personCount= 4-personCount;
                }

            }
        }else{
            personCount=4;
        }        
        return personCount;
    };

    useEffect(()=>{
        const availArr=[];
        for(var j=0; j<courtArr.length; j++){
            availArr[j]=[];
            for(var i=0; i<timeValue.length; i++){
                availArr[j][i]=getSlots(timeValue[i], courtArr[j]);
            }
        }
        setAvailability(availArr);
    },[slot])

    useEffect(()=>{
        var dur=Number(duration);
        var strTime=Number(from);
        var avail;

        if(slot&& slot.length>0 && availability){
            var option=availability[courtNo-1][timeValue.indexOf(Number(from))];

            while(dur>1){
                option= option>(availability[courtNo-1][timeValue.indexOf(strTime+1)]) ? 
                availability[courtNo-1][timeValue.indexOf(strTime+1)] : option;
                dur--;
                strTime++;
            }
            if(option===0){
                avail=0;
            }else{
                avail=new Array(option).fill(0);
                for(var i=1; i<=option; i++){
                    avail[i-1]=i;
                }
            }
            setPersonOption(avail);
        }else{
            avail=new Array(4).fill(0);
            for(var i=1; i<=4; i++){
                avail[i-1]=i;
            }
            setPersonOption(avail);
        }
        
    },[from, duration, courtNo])

    const slotAvailability= (from, person, courtNo, duration, availability, timeValue)=>{
        var timeArr=new Array (duration).fill(-1);
        timeArr[0]=[Number(from)]
        for(var i=1; i<duration; i++){
            console.log(Number(from)+i)
            timeArr[i]=[Number(from)+i]
        }
        var availabilityStatus=false;
        if(slot){
            for(var j=0; j<timeArr.length; j++){
                if(availability && availability[courtNo-1][timeValue.indexOf(timeArr[j])] < Number(person)){
                    break;
                }
                if(j===timeArr.length-1){
                    availabilityStatus=true;
                }
            }
        }else{
            availabilityStatus=true;
        }
        return availabilityStatus;
    }
    
    return ( {availability, personOption, slotAvailability} );
}
 
export default SlotAvailability;