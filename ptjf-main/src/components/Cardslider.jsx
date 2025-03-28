import React,{useState,useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from "react-responsive-carousel";
import './Cardslider.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Cardslider  () {
  const [Location,setlocation]=useState(null)
  const [Pay,setpay]=useState(null)
  const navigate=useNavigate();
  const [job,setjob]=useState([])
  const [filter,setfilter]=useState([])
    useEffect(()=>{
      const fetchjob=async()=>{
        try{
          const response=await axios.get('http://localhost:5000/Job/jobdetails')
          await setjob(response.data)

        }catch(error){
          console.error('error',error)
        }
      }
      fetchjob()
    },[])
    console.log(job)

  const handleclick=(job)=>{
    navigate('/Student/Jobdetails',{state:{job}})
  }
  const payrange={
    'below 1k':[0,999],
    '1k-5k':[1000,5000],
    'above 5k':[5001,Infinity],
  };
  useEffect(()=>{
    let filtered=job.filter(job=>{
      let match=true
      if(Location && job.district.toLowerCase() !==Location.toLowerCase()){
        match=false
      }
      if(Pay){
        const [min,max]=payrange[Pay]
        const jobpay=parseInt(job.totalpay)
        if(jobpay<min || jobpay>max){
          match=false
        }
      }
      return match
    })
    setfilter(filtered)
  },[Location,Pay,job])
  return (
    <div className="cardcontainer">
      <div className="filters">
       <h4 id="h">Filters</h4>
       <label htmlFor="Location">Location</label>
       <select value={Location} onChange={(e)=>setlocation(e.target.value)}>
      <option value="">All</option>
        <option value="visakhapatnam">Visakhapatnam</option>
        <option value="vizianagaram">Vizianagaram</option>
        <option value="srikakulam">srikakulam</option>
       </select>
       <label htmlFor="Pay">Pay</label>
       <select value={Pay} onChange={(e)=>setpay(e.target.value)}>
       <option value="">All</option>
        <option value="below 1k">below 1K</option>
        <option value="1k-5k">1k-5k</option>
        <option value="above 5k">above 5k</option>
       </select>
      
       <button>Apply</button>
      </div>
      <h1>Filtered jobs</h1>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={33.33}
        emulateTouch={true} // Added for better touch device experience
        autoPlay={true} // AutoPlay the carousel
        interval={3000}
      >
        {filter.length>0 ? (filter.map((card, index) => (
          <div key={index} className="card-item" >
            <div className="card-link">
              <p className={`badge badge-${card.role}`}>{card.title}</p>
              <h2 className="card-title">
              {card.companyname}
              </h2>
              <p className="w">
                {card.address}-
                {card.district}
              </p>
              <p>₹{card.totalpay}</p>
             <h4 className="aa" onClick={()=>handleclick(card)}>check details</h4>
            </div>
          </div>
        ))):(<p>No match found</p>)}
      </Carousel>
      <h1>All jobs</h1>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={33.33}
        emulateTouch={true} // Added for better touch device experience
        autoPlay={true} // AutoPlay the carousel
        interval={3000}
      >
        {job.map((card, index) => (
          <div key={index} className="card-item" >
            <div className="card-link">
              <p className={`badge badge-${card.role}`}>{card.title}</p>
              <h2 className="card-title">
              {card.companyname}
              </h2>
              <p className="w">
                {card.address}-
                {card.district}
              </p>
              <p>₹{card.totalpay}</p>
             <h4 className="aa" onClick={()=>handleclick(card)}>check details</h4>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Cardslider;