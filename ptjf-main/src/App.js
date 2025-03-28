import React from 'react';
import './App.css';
import AboutUs from './components/AboutUs';
import {Route,Routes } from 'react-router-dom';
import Details from './components/details';
import Employer from './components/employer';
import Student from './components/Student';
import Jobdetails from './components/Jobdetails';
import Admin from './components/Admin';
import Login from './components/Login'
import Applicant from './components/Applicant';
function App() {
  return (
   
  
      
      <Routes>
        <Route path="/" element={<AboutUs/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Applicant' element={<Applicant/>}/>
        <Route path="/Details" element={<Details/>}/>
        <Route path="/Employer" element={<Employer/>}/>
        <Route path="/Student" element={<Student/>}/>
        <Route path='/Student/Jobdetails' element={<Jobdetails/>}/>
        <Route path='/Admin' element={<Admin/>}/>
      </Routes>
  );
}

export default App;
