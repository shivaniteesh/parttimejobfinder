import React,{useState,useEffect} from "react";
import Setting from "./settings";
import Cardslider from "./Cardslider"
import Profile from "./Profile";
import Home1 from "./Home"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Home,Search,Settings,LogOut,User} from 'lucide-react'
import '../styles/Student.css'
function Student(){
  const navigate=useNavigate()
  const [user,setuser]=useState([])
    const [active,setActive]=useState();
    useEffect(()=>{
      setActive('home')
    },[])
    const handleLogout=async()=>{
            try{
                const response=await axios.post('http://localhost:5000/Auth/logout')
                console.log(response.data.message)
                navigate('/Login')
            }catch(error){
                console.error("error",error)
            }
        }
      const iconclick=(item)=>{
        setActive(item)
      }
      useEffect(()=>{
        const fetchuser=async()=>{
              try{
                    const response = await axios.get('http://localhost:5000/Auth/user',{
                          withCredentials:true,
                    })
                    await setuser(response.data)

        }catch(error){
              console.error('error',error)
        }
}
        fetchuser()            
},[])  
const userid=user.userid
console.log(userid)
      return (
        <div className="employer">
          <nav className="snav">

<h3 className={`navlist ${active==='home'?'active-icon':''}`} onClick={()=>iconclick("home")}><Home color="white"/></h3>
<h3 className={`navlist ${active==='fill'?'active-icon':''}`} onClick={()=>iconclick("fill")}><Search color="white"/></h3>
<h3 className={`navlist ${active==='settings'?'active-icon':''}`} onClick={()=>iconclick("settings")}><Settings color="white"/></h3>
<h3 className={`navlist ${active==='profile'?'active-icon':''}`} onClick={()=>iconclick("profile")}><User color="white"/></h3>
<h3 className="navlist" onClick={handleLogout}><LogOut color="white"/></h3>

</nav>
    <section className="content">
          {active==='home'&&<Home1 role="student" userid={userid}/>}
          {active==='settings'&&<Setting/>}
          {active==="fill"&&<Cardslider/>}
          {active==='profile'&&<Profile/>}
    </section>
    { /* <Footer/>*/}
    </div>
      );
      
}
export default Student;
