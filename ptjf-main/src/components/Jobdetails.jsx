import React,{useState,useEffect} from "react";
import "../styles/Jobdetails.css";
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux";
import { apply,accept } from "../redux/jobSlice";
import {useNavigate, useLocation } from "react-router-dom";
function Jobdetails(){
    const location=useLocation()
    const navigate=useNavigate()
    const job=location.state?.job
  
  const employerid=job.userid
  console.log(employerid)
  const [user,setuser]=useState([])
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
    const ph=user.phone
  const userid=user.userid
const from=job.from
const to=job.to
const jobid=job.jobid
const title=job.title
const company=job.companyname
  console.log(userid)
  const handleapplication=async ()=>{
    try{
        const response=axios.post('http://localhost:5000/Apply/apply',{
            from,to,userid,employerid,jobid,company,title
        })
        console.log(response.data)
        await alert('applied')
        navigate('/Student')
    }catch(error){
        console.error('error',error)
    }
  }
    return(
        <div className="jd">
         
               
           
            <div className="vprofilecontainer">
                           
                           <div className="vheader">
                               <h2> Details</h2>
                           </div>
                           <div className="vprofile">
                               <h3>{job.title}</h3>

                           </div>
                           
                           <div className="vdetails">
                           <div><label>Working hours</label><p><strong>{job.workinghours}</strong></p></div>  
                            <div><label>From</label><p><strong>{job.from}</strong></p></div>
                            <div><label>To</label><p><strong>{job.to}</strong></p></div>
                            <div><label>address</label><p><strong>{job.address}</strong></p></div>
                            <div><label>District</label><p><strong>{job.district}</strong></p></div>         
                           <div><label>Contact</label><p><strong>{ph}</strong></p></div>
                           <div><label>Pay</label><p><strong>{job.totalpay}</strong></p></div>
                               </div>
                               <button onClick={handleapplication}>Apply</button>
                             
                           </div>
        </div>
    )
}
export default Jobdetails;