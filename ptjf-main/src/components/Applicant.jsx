import React,{useState,useEffect} from "react";
import '../styles/Profile.css';
import axios from 'axios'
import { useLocation ,useNavigate} from "react-router-dom";

function Applicant(){
const [user,setuser]=useState([])

const location=useLocation()
const id=location.state
console.log(id)
const userid=id.studentid
    const navigate=useNavigate() 
      useEffect(()=>{
                const fetchuser=async()=>{
                      try{
                            const response = await axios.get(`http://localhost:5000/Auth/userdata?userid=${userid}`)
                            await setuser(response.data)
    
                }catch(error){
                      console.error('error',error)
                }
    }
                fetchuser()            
    },[])  
   
    return(
        <div className="profile">
            <section className="one">
          
            <label className="pname" htmlFor="">{user.name}</label>
            </section>
            <section className="two">
            <label className="l" htmlFor="">Email</label><h2 className="p">{user.email}</h2>
            <label className="l" htmlFor="">phone number</label><h2 className="p">{user.phone}</h2>
            <label className="l" htmlFor="">Address</label><p className="p">{user.address}</p>
            <label className="l" htmlFor="">Aadhar</label><h2 className="p">{user.aadhar}</h2>
            <label className="l" >District</label><h2 className="p">{user.district}</h2>
            </section>
        </div>
    );
}
export default Applicant;