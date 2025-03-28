import React,{useState,useEffect} from "react";
import '../styles/Profile.css';
import axios from 'axios'
import img from './ptjf.png';
function Profile(){
const [user,setuser]=useState([])
    const p=[
        {
            name:"DSN",
            Email:"abc@gmail.com",
            phonenumber:"13453657675",
            adhar:904357,
            address:"wefdsgggggggggggggggg",
        }
    ]
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
    console.log(user)
    const profile=p[0]
    return(
        <div className="profile">
            <section className="one">
            <img src={img} alt="profile pic"  height="200px" width="200px" className="i"/>
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
export default Profile;