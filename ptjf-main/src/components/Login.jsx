import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import img from './1000119569.png';
import Cookie from 'js-cookie';
import axios from 'axios'
function Login(){
    const navigate=useNavigate()
    const [email,setEmail] =useState('');
    const [Role,setRole] =useState('employer');
    const [password,setPassword] =useState('');
    const handleSubmitLogin=async (e)=>{
        e.preventDefault()  
    
                
                
                console.log("handlelogin")
             if(password.length<8){
                alert('Password should be atleast 8 characters')
                return
             }  
            try{
               
                const res=await axios.post('http://localhost:5000/Auth/login',{
                    email,password,role:Role
                    
                } ,{withCredentials:true});
                
                console.log({email,password,Role})
               console.log("res.data--",res.data)
           
              const token=Cookie.get("token")
              
               console.log('token',token)
               if(Role==='student'){
                navigate('/Student')
            }
            if(Role==='employer'){
                navigate('/Employer')
            }
            if(Role==='admin'){
                navigate('/Admin')
            }
             }catch(error){
                console.error(error);
                alert(error.response ? error.response.data.message : 'Login failed');
                
             }
        
    }
    const handleFP=()=>{
        console.log('forgot')
    }
    const handleClick=()=>{
        navigate('/Details')
    }
    return(
        <div className='login'>
            <div className="left">
                <img src={img} alt='pic'/>
            </div>
            <div className="right">
        <h2 id='loginheading'>Login</h2>
        <form onSubmit={handleSubmitLogin}>
            <div className="Form">
           <label className='llabel' htmlFor="Role" >Role
                <select id="Role"  value={Role} onChange={(e)=>setRole(e.target.value)}>
                    <option value="student" >Student</option>
                    <option value="employer" >Employer</option>
                    <option value="admin" >Admin</option>
                </select>
            </label>
            <label className='llabel' htmlFor="email">Email
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
            </label>
            <label className='llabel' htmlFor="password">Password
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required ></input>
            </label>
            <button className='lbutton' type="submit">Login</button>
            <p onClick={handleFP} className="toggle-link">
                            Forgot password
                        </p>
            <p onClick={handleClick} className="toggle-link">
                            Don't have an account? Register here
                        </p>
                        <div></div>
           </div> 

        </form>
        </div>
    </div>
    );
}
export default Login;