import React,{useState,useEffect} from "react";
import '../styles/Employer.css'
import Postjob from "./Postjob";
import Setting from "./settings";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Home1 from "./Home";
import {Home,Settings,LogOut,User,FilePlus} from 'lucide-react'
function Employer(){
      
      const navigate=useNavigate()
      const [user,setuser]=useState([])
      const logout=async()=>{
            try{
                const response=await axios.post('http://localhost:5000/Auth/logout')
                console.log(response.data.message)
                navigate('/Login')
            }catch(error){
                console.error("error",error)
            }
        }
    const [active,setActive]=useState();
          const iconclick=(item)=>{
            setActive(item)
          }
          useEffect(()=>{
            setActive('home')
      },[])
        useEffect(()=>{
            const fetchuser=async()=>{
                  try{
                        const response = await axios.get('http://localhost:5000/Auth/user',{
                              withCredentials:true,
                        })
                        setuser(response.data)

            }catch(error){
                  console.error('error',error)
            }
}
            fetchuser()            
},[])  
            console.log('user',user)
           const userid=user.userid
      return (
        <div className="employer">
              <nav className="snav">

<h3 className={`navlist ${active==='home'?'active-icon':''}`} onClick={()=>iconclick("home")}><Home color="white"/></h3>
<h3 className={`navlist ${active==='find'?'active-icon':''}`} onClick={()=>iconclick("find")}><FilePlus color="white"/></h3>
<h3 className={`navlist ${active==='settings'?'active-icon':''}`} onClick={()=>iconclick("settings")}><Settings color="white"/></h3>
<h3 className={`navlist ${active==='profile'?'active-icon':''}`} onClick={()=>iconclick("profile")}><User color="white"/></h3>
<h3 className="navlist" onClick={logout}><LogOut color="white"/></h3>

</nav>
        
    <section className="content">
    {active==='home'&&<Home1 role="employer" userid={userid}/>}
          {active==='find'&&<Postjob/>}
          {active==='settings'&&<Setting/>}
          {active==='profile'&&<Profile/>}
    </section>
    </div>
      );
      
}
export default Employer;