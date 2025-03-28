import React,{useState,useEffect} from "react";
import axios from 'axios'
import '../styles/Postjob.css'
function Postjob(){
    const [title,settitle]=useState('')
    const [companyName,setCompanyName]=useState('');
    const [workingHours,setworkingHours]=useState('');
    const [fromdate,setfromdate]=useState('');
    const [todate,settodate]=useState('');
    const [totalPay,settotalPay]=useState('');
    const [address,setaddress]=useState('');
    const [district,setdistrict]=useState('');
    const [qualification,setqualification]=useState('10th')
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
        const userid=user.userid
        console.log('userid',userid)
        console.log(title,companyName,qualification)
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:5000/Job/jobdetails',{
                title,
                companyname:companyName,
                workinghours:workingHours,
                qualification,
                from:fromdate,
                to:todate,
                totalpay:totalPay,
                address,
                district,
                userid,
              
            })
            console.log('response',response.data)
            await alert('registered')
        }catch(error){
            console.error('error',error)
        }
    
    }
    return(
        <div className="Postjob-container">
    
            <form id="form" onSubmit={handleSubmit}>
                <label className="label" >Job Title</label>
                <input type="text" id="title" className="input" value={title} onChange={(e)=>settitle(e.target.value)} required/>
    <label  className="label">Company/Store Name:</label>
    <input type="text" id="companyName" name="companyName" className="input" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required />
        <label className="label">Minimum Qualification</label>
    <select id="qualification" className="input" value={qualification} onChange={(e)=>setqualification(e.target.value)} required>
        <option value="10th">10th</option>
        <option value="12th">12th</option>
        <option value="Graduate">Graduate</option>
    </select>
    <label  className="label">Working Hours:</label>
    <input type="text" id="workingHours" name="workingHours" className="input" value={workingHours} onChange={(e)=>setworkingHours(e.target.value)} required />

    <label  className="label">From Date:</label>
    <input type="date" id="date" name="date" className="input" value={fromdate} onChange={(e)=>setfromdate(e.target.value)} required />
    <label  className="label">To Date:</label>
    <input type="date" id="date" name="date" className="input" value={todate} onChange={(e)=>settodate(e.target.value)} required />

    <label  className="label">Total Pay(in Rupees):</label>
    <input type="number" id="totalPay" name="totalPay" step="0.01" className="input" value={totalPay} onChange={(e)=>settotalPay(e.target.value)} required />

    <label className="label">Address:</label>
    <textarea name="address" id="address" className="input"  value={address} onChange={(e)=>setaddress(e.target.value)}></textarea>
    <label  className="label">District</label>
    <input type="text" id="district" name="district" className="input" value={district} onChange={(e)=>setdistrict(e.target.value)} required/>

  <button type="submit" className='post'>Submit</button>
</form>
            
        </div>
    );
}
export default Postjob;