import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import useAuthContext from "../Hooks/useAuthContext";

import slidder1 from "../appFiles/slidder1.jpg";
import slidder2 from "../appFiles/slidder2.jpg";
import slidder3 from "../appFiles/slidder3.jpg";

const Carousel = () => {
    const {user}=useAuthContext();
    const content=[{img:slidder1, text:{header:"WELCOME", body:"World Class Batminton"}}, 
        {img:slidder2, text:{header:"FEELS BORING", body:"Set Your Goal High"}}, 
        {img:slidder3, text:{header:"COMPETE WITH YOURSELF", body:"Think Beyond Warmup"}}];

    const [sliderImage, setSliderImage]= useState(0);

    const handlePrevious= ()=>{
        setSliderImage(()=>sliderImage===0 ? content.length-1 : sliderImage-1);
    };
    const handleNext= ()=>{
        setSliderImage(()=>sliderImage===content.length-1 ? 0 : sliderImage+1);
    };;

    useEffect(()=>{
        const imgInterval= setInterval(() => {
            setSliderImage(()=>sliderImage===content.length-1 ? 0 : sliderImage+1);
            }, 5000);

        return ()=>clearInterval(imgInterval);
    },[sliderImage])

    return ( <div className="carousel">
                <div className="sliderContainer">
                    <div className="leftArrow" onClick={handlePrevious}>{"<"}</div>
                    <div className="rightArrow" onClick={handleNext}>{">"}</div>
                    <div className="sliderStyles">
                        <div className="slideStyles" style={{backgroundImage:`url(${content[sliderImage].img})`}}>
                            <div>
                                <h1>{content[sliderImage].text.header}</h1>
                                <p>{content[sliderImage].text.body}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slidePointer">
                        {content.map((ele, index)=>{
                            return<div onClick={()=>setSliderImage(index)} style={sliderImage===index ? {color: "black"}: {color: "#c7c6c6"}}>.</div>
                        })}
                </div>
                <div className='getStarted'>{!user && <Link to="/signup"><button>Get Started</button></Link>}</div>
            </div> );
}
 
export default Carousel;