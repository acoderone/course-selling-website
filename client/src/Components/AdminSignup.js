import React from 'react'
import {Card,Button,ButtonGroup} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './AdminSignup.css'
import { useNavigate } from 'react-router-dom';

const PORT=process.env.PORT || 8000;
function AdminSignup() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
const handleClick1=()=>{

navigate('/admin/Signup')
}

const handleClick2=()=>{
  navigate('/user/signup')
}
  const handleSignup=async(e)=>{
  e.preventDefault();
  try{
   const response= await axios.post(`http://localhost:${PORT}/admin/signup`,{username,password})
   if(response.status===200){
    alert("Signup successful");
    navigate('/admin/login');
   }

  }
  catch(e){
    console.error(e);
  }
  }
    
  return (
    <div>
       <Card className='Card'>
       <h1>SIGNUP</h1>
      <CardContent className='Card-Content'>
      
      <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          onChange={(e)=>setUsername(e.target.value)}
        />
        <br></br>
        <TextField
          required
          id="outlined-required"
          label="Password"
          defaultValue=""
          type='password'
          onChange={(e)=>setPassword(e.target.value)}
        />

<ButtonGroup
        className='button-group1'
  disableElevation
  variant="outlined"
  aria-label="Disabled elevation buttons"
>
  <Button onClick={handleClick1}>Admin</Button>
  <Button onClick={handleClick2}>User</Button>
</ButtonGroup>
        <Button className='button' variant="contained" onClick={handleSignup}>SIGNUP</Button>
        <div className='Already-Account'>
         <p>Already have Account? <Link to='/admin/Login'>Login</Link> </p>
         
        
        </div>
        
      </CardContent>
     
    </Card>
    </div>
  )
}

export default AdminSignup
