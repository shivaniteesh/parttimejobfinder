import React, { useState } from "react";
import "../styles/details.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function Details() {
  const navigate=useNavigate()
  
  const  [role,setrole]=useState('employer')
  const  [name,setname]=useState('')
  const  [email,setemail]=useState('')
  const  [phone,setphone]=useState('')
  const  [password,setpassword]=useState('')
  const  [aadhar,setaadhar]=useState('')
  const  [qualification,setqualification]=useState('10th')
  const  [company,setcompany]=useState('')
  const  [address,setaddress]=useState('')
  const  [district,setdistrict]=useState('')




  const handleSubmit =async (e) => {
    e.preventDefault();
    if(password.length<8){
      alert('password atleast 8 characters')
      return
    }
    if(aadhar.length<8){
      alert('aadhar atleat 12 characters')
      return
    }
    try{
      const response=await axios.post('http://localhost:5000/Auth/userDetails',{
        role,name,email,password,address,district,phone,aadhar,qualification,company
      })
      console.log('user created')
      alert('account created')
      navigate('/Login')
    }catch(error){
      console.error('error',error)
    }
    
   
   
  };

  return (
    <div className="Details">
      <h2>Details Form</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="Role">Role:</label>
         <select  id="Role" value={role} onChange={(e)=>setrole(e.target.value)} required>
          <option value=" " disabled selected>Select a role</option>
          <option value='employer'>Employer</option>
          <option value="student">Student</option>
         </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            maxLength={10}
            required
          />
        </div>

        <h3>Address</h3>
        <div className="address-section">
          <div>
            <label htmlFor="address">Address</label>
            <textarea
              id="doorno"
              name="address"
              value={address}
              onChange={(e)=>setaddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              onChange={(e)=>setdistrict(e.target.value)}
              required
            />
          </div>

        </div>

        <div>
          <label htmlFor="aadhar">Aadhaar Number:</label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            value={aadhar}
            onChange={(e)=>setaadhar(e.target.value)}
            maxLength={12}
            required
          />
        </div>
{/*
        <div>
          <label htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <div>
          <label htmlFor="aadharPhoto">Upload Aadhaar Photo:</label>
          <input
            type="file"
            id="aadharPhoto"
            name="aadharPhoto"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>*/}
      {role==='student'&& (<div>
            <label htmlFor="education">Educational Qualification:(only for students)</label>
            <select
              id="education"
              name="education"
              value={qualification}
              onChange={(e)=>setqualification(e.target.value)}>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="graduate">graduate</option>
              
           </select>
          </div>)}
          
{role==='employer' &&(
  <div>
  <label htmlFor="company">Company:(only for employers)</label>
  <input
    type="text"
    id="company"
    name="company"
    value={company}
    onChange={(e)=>setcompany(e.target.value)}
    
  />
</div>
)}
          

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Details;
