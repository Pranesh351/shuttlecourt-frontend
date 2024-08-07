import {useState} from 'react';
import { Link } from 'react-router-dom';
import SlotTime from '../component/SlotTime';
import SubscriptionPack from '../component/subscriptionPack';
import useAuthContext from '../Hooks/useAuthContext';
import Carousel from '../component/carousel';
import help from '../appFiles/help.png';
import Help from '../component/help';

const Home = () => {
    const [courtNo, setCourtNo]= useState('1');
    const [slotTime, setSlotTime]= useState();
    const {user}= useAuthContext();
   

    return ( <div>
                <Carousel/>
                <table style={user&&{marginTop: "-100px"}}><SlotTime/></table>
                {!user && <SubscriptionPack/>} 
                <Help/>
    </div> );
}
 
export default Home;