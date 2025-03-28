import React,{useState,useEffect} from "react";
import '../styles/Admin.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Admin(){
    const navigate=useNavigate()
    const [stats,setstats]=useState([])
    const [student,setstudent]=useState([])
    const [employer,setemployer]=useState([])
    const [job,setjob]=useState([])
    const [issue,setissue]=useState([])
    const deletejob=async(jobid)=>{
        try{
            const response=await axios.delete(`http://localhost:5000/Auth/delete/${jobid}`)
            if(response.status===200){
                alert('job deleted successfully')
                setjob(job.filter(job=>job.jobid!==jobid))
            }else{
                alert('failed to delete')
            }
        }catch(error){
            console.error('error',error)
        }
    }
    const logout=async()=>{
        try{
            const response=await axios.post('http://localhost:5000/Auth/logout')
            console.log(response.data.message)
            navigate('/Login')
        }catch(error){
            console.error("error",error)
        }
    }
    useEffect(()=>{
        const fetchdata=async (params) => {
            
        
        try{
            const response=await axios.get('http://localhost:5000/data')
            await setstudent(response.data.student)
            await setemployer(response.data.employer)
            await setjob(response.data.job)
            await setissue(response.data.issue)
        }catch(error){
            console.error('error')
            
        }
    } 

    fetchdata()
    },[])
    console.log(student,employer,job)
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/stats')
                setstats(response.data)
            }catch(error){
                console.error('error',error)
            }
        }
        fetch()
    },[])
   
    const viewProfile=(id)=>{
        navigate(`/Profile/${id}`)
    }
    const [showscroll,setshowscroll]=useState(false);
    const Scroll=(id)=>{
        const element=document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior:"smooth",inline:'start'})
        }};
     useEffect(()=>{
        Scroll('greet')
     },[])
      
    return(
    <div className="admin">
        <nav className="anav">
      
            <h3 className="list" onClick={()=>Scroll("students")}>Students</h3>
            <h3 className="list" onClick={()=>Scroll("employers")}>Employers</h3>
            <h3 className="list" onClick={()=>Scroll("greet")}>HOME</h3>
            <h3 className="list" onClick={()=>Scroll("jobpostings")}>Job Postings</h3>
            <h3 className="list" onClick={()=>Scroll("stats")}>Stats</h3>
            <h3 className="list" onClick={()=>Scroll("feedback")}>Feedbacks</h3>
            
        </nav>
        <div className="scrollcontainer">
       
        <section className="Students" id="students">
            <h1>Students Registered</h1>
        <table className="at">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th> name</th>
                                <th>Phone</th>
                                <th>email</th>
                                <th>address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {student.map((e)=>(
                            <tr key={e.id} >
                                <td>{e.userid}</td>
                                <td>{e.name}</td>
                                <td>{e.phone}</td>
                                <td>{e.email}</td>
                                <td>{e.address}-{e.district}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
        </section> 
        <section className="Employers" id="employers">
        <h1>Employers Registered</h1>
        <table className="at">
                        <thead>
                            <tr>
                            <th>Id</th>
                                <th> name</th>
                                <th>Phone</th>
                                <th>email</th>
                                <th>address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employer.map((e)=>(
                            <tr key={e.id} >
                                 <td>{e.userid}</td>
                                <td>{e.name}</td>
                                <td>{e.phone}</td>
                                <td>{e.email}</td>
                                <td>{e.address}-{e.district}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </section>
            <section className="greet" id="greet">
            <h1>Welcome to Dashboard  Chief..!!</h1>
            <button onClick={logout}>Logout</button>
        </section>
        <section className="Job-Postings" id="jobpostings">
        <h1>Job Postings</h1>
        <table className="at">
                        <thead>
                            <tr>
                                <th>Job Id</th>
                                <th>Job Name</th>
                                <th>Job pay</th>
                                <th>Company</th>
                                <th>working hours</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Delete job</th>
                            </tr>
                        </thead>
                        <tbody>
                        {job.map((e)=>(
                            <tr key={e.id} >
                                <td>{e.jobid}</td>
                                <td>{e.title}</td>
                                <td>{e.totalpay}</td>
                                <td>{e.companyname}</td>
                                <td>{e.workinghours}</td>
                                <td>{e.from}</td>
                                <td>{e.to}</td>
                                <td><button onClick={()=>deletejob(e._id)}>Remove</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </section> 
            <section className="Stats" id="stats">
                <label className="statslabel">Number of users: {stats.users}</label>
                <label className="statslabel">Number of Students: {stats.student}</label>
                <label className="statslabel">Number of Employers: {stats.employer}</label>
                <label className="statslabel">Number of Postings: {stats.job}</label>
                <label className="statslabel">Number of Applications: {stats.apply}</label>
            </section>
            <section className="Feedback" id="feedback">
            <h1>Employers Registered</h1>
        <table className="at">  
                        <thead>
                            <tr>
                                <th>User type</th>
                                <th> name</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                        {issue.map((e)=>(
                            <tr key={e.id} >
                                <td>{e.role}</td>
                                <td>{e.name}</td>
                                <td>{e.issue}</td>
                                
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>  
                </div>
           
    </div>
    );
}
export default Admin;