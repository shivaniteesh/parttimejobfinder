import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Home.css";
import axios from 'axios'


function Home({role,userid}){
    const uid=userid
    console.log(uid)
        const [Data,setdata]=useState([])
        useEffect(()=>{
        const fetch= async ()=>{
            try{
                console.log('uid',uid,'type',typeof uid)
                const response=await axios.get(`http://localhost:5000/Apply/apply?uid=${uid}`)
                 setdata(response.data)
            }catch(error){
            console.error('error ',error)       
        }}
        fetch()
},[uid])
        console.log(Data)
    const data=[
    role==="student"?[
        {id:1,
            name:"dsn",
            company:"abc",
            status:"applied"
        }
    ]:[{
        id:1,
        name:"sdd",
        company:"abc",
        status:"pending"
    },{
        id:2,
        name:"s",
        company:"as",
        status:"pending"
    },
    ]
    ]
    const navigate=useNavigate();
    const viewProfile=(id)=>{
        navigate('/Applicant',{state:id})
    }
    return(
       
        <div className="hc">
            <section className="hd">
            {Data.length===0?(<h1>No {role==="student"?"applications":"Applicants"} found</h1>):
             role==="student"?(
                <div className="HS">
                    <h2 className="hm">Your applications</h2>
                    <table className="hl">
                        <thead>
                            <tr>
                                <th>Job Id</th>
                                <th>Job Title</th>
                                <th>Company name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Data.map((e)=>(
                            <tr key={e.id} >
                                <td>{e.jobid}</td>
                                <td>{e.title}</td>
                                <td>{e.company}</td>
                                <td>{e.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            ):(
                <div className="HE">
                    <h2 className="hm">Your Applicants</h2>
                    <table className="hl">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Student Id</th>
                            
                                <th>Status</th>
                                <th>Details</th>
                    
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Data.map((e)=>(
                                <tr key={e.id} >
                                    <td>{e.title}</td>
                                    <td>{e.studentid}</td>
                                    
                                    <td>{e.status}</td>
                                    <td><button className="hb" onClick={()=>{viewProfile(e)}}>View details</button></td>
                                
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    
                </div>
            )}
            </section>
           
        </div>
    );
}
export default Home;