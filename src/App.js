import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import useAuthContext from "./Hooks/useAuthContext";
//require('dotenv').config();

//pages and component
import { useState, useEffect } from "react";
import useSlotContext from "./Hooks/useSlotContext";
import useSubscriptionContext from "./Hooks/useSubscriptionContext";

import NavBar from './component/navBar';
import Footer from "./component/footer";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import UserDetails from './pages/userDetails';
import Subscription from "./pages/Subscription";
import Features from "./pages/features";
import Contact from "./pages/contactUs";
import About from "./pages/aboutUs";
import Support from "./pages/support";

function App() {
  const {user}= useAuthContext();
  const slots= useSlotContext();
  const subscriptions= useSubscriptionContext();
  const [reset, setReset]=useState(false);

  console.log(process.env.REACT_APP_URL);
  useEffect(()=>{
    if(slots && slots.slot){ 
        slots.slot.map(async(ele)=>{
            if(new Date(ele.createdAt).toLocaleDateString() != new Date().toLocaleDateString()){
              const response= await fetch(process.env.REACT_APP_URL+'/api/slot/'+ele._id, {method:"DELETE",})
              if(response.ok){
                  slots.dispatch({type:"DELETE SLOT", payload:{_id:ele._id}})
              }
            }
        })
    }
  }, [slots.slot])

  useEffect(()=>{

    if(user && subscriptions && subscriptions.subscription.length>0){ 
      const addDays=() =>{
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + subscriptions.subscription[0].days); 
        return newDate;
      }
        subscriptions.subscription.map(async(ele)=>{
            if(new Date()>=addDays()){
                const response= await fetch(process.env.REACT_APP_URL+'/api/subscription/'+ele._id, {
                    method:"DELETE",
                    headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}
                })

                if(response.ok){
                    slots.dispatch({type:"DELETE SLOT", payload:{_id:ele._id}})
                }
            }
        })
    }
  }, [subscriptions.subscription])


  return (
    <div className="App">
       <BrowserRouter>
        <NavBar setReset={setReset}/>
        <div className="Page">
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
          <Routes>
            <Route path='/userDetails' element={<UserDetails/>} />
          </Routes>
          <Routes>
            <Route path='/login' element={!user?<Login reset={reset} setReset={setReset}/>:<Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path='/resetPassword' element={!user?<Login reset={true} setReset={setReset}/>:<Navigate to="/"/>} />
          </Routes>
          <Routes>
            <Route path='/subscriptions' element={<Subscription/>}/>
          </Routes>
          <Routes>
            <Route path='/features' element={<Features/>}/>
          </Routes>
          <Routes>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
          <Routes>
            <Route path='/about' element={<About/>}/>
          </Routes>
          <Routes>
            <Route path='/support' element={<Support/>}/>
          </Routes>
        </div>
        <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
