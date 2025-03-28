import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/AboutUs.css';
import img from './ptjf.png';

function AboutUs() {
  const navigate=useNavigate();
 
    return (

      <div className="Home">
         <div className="getStarted">
          <div className='img'>
          <img src={img}  alt='logo' height='150px' width='400px'/>
          </div>
          <div className="welcome">
      <h5>Part Time Job Finder</h5>
      <p >Your go to user friendly platform!</p>
    <button className="button" onClick={()=>navigate('/Login')}> GET STARTED</button>
      </div></div>
      <div className="about-us-container">
        <h1 className="about-us-heading">Part-Time Job Finder Platform</h1>
        <p className="about-us-description">Welcome to your gateway to exciting part-time opportunities!</p>
        <p className="about-us-content">
          At Part-Time Job Finder Platform, we connect individuals seeking flexible work arrangements with businesses in need of talented part-time employees. Our mission is to create a seamless and rewarding experience for both job seekers and employers.
        </p>
        <p className="about-us-content">
          We understand the importance of work-life balance and the desire for flexible employment options. Our platform provides a centralized hub for discovering a wide variety of part-time jobs, from freelance gigs and remote roles to on-site positions with flexible schedules.
        </p>
        <p className="about-us-content">
          Whether you're a student looking to earn extra income, a parent seeking flexible work around family commitments, or someone looking to explore new career paths, our platform is designed to help you find the perfect part-time job that suits your needs and aspirations.
        </p>
        <p className="about-us-content">
          Join our vibrant community of job seekers and employers. Browse through exciting opportunities, create a professional profile, and connect with potential employers today. Start your journey towards a fulfilling and flexible work experience.
        </p>
        
      </div>
      </div>
    );
  
}
export default AboutUs;