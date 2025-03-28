import React,{useState} from "react";
import '../styles/settings.css';
import axios from 'axios'
function Setting(){

    const [role,setrole]=useState('')
    const [name,setname]=useState('')
    const [feedback,setfeedback]=useState();
const handleform=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post('http://localhost:5000/issue',{
            role,name,issue:feedback
        })
        console.log(response.data)
        alert('complaint raised')
    }catch(error){
        console.error('error',error)
    }
}

    return(
       
        <div className="settings">
        <h2>Settings</h2>
        <div className="contact-us">
        <h3>Contact Us</h3>
        <h3>Email:admin@gmail.com</h3>
        <form className="feedback" onSubmit={handleform}>
            <label>Role(S/E)</label>
            <input type='text' value={role} onChange={(e)=>setrole(e.target.value)} required/>
            <label>Name</label>
            <input type='text' value={name} onChange={(e)=>setname(e.target.value)}/>
            <label>Feedback</label>
            <textarea name="Feedback" id="feedback" value={feedback} onChange={(e)=>setfeedback(e.target.value)}></textarea>    
            <button type="submit">Submit</button>
        </form>   
        </div>
       
        
        </div>
    );
}
export default Setting;