import React, { useState } from "react";
import {Card,Button} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import './CreateCourses.css';
import axios from 'axios';
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = useState("");
    const [price,setPrice]=useState("0");
    const [description,setDescription]=useState('');
    const [imageLink,setImageLink]=useState('');
    const [published,setPublished]=useState('');
    const [error, setError] = useState('');
    const handleCreate=async(e)=>{
      
       e.preventDefault();
       try{
        const token = localStorage.getItem('token');
        const response=await axios.post('http://localhost:8000/admin/courses',{title,price,description,imageLink,published},
        {

          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
        )

        if(response.status===200){
          alert('Course is added');
        }  

       }
       catch(e){
             setError('An error occurred during login. Please try again later.');
       }
    }
    return  (<>
       
        <Card className='card'>
        <h1>Create Course</h1>
      <CardContent className='Card-Content'>
      
      <TextField
          required
          id="outlined-required"
          label="Title"
          defaultValue=""
          onChange={(e)=>setTitle(e.target.value)}
        />
        <br></br>
        <TextField
          required
          id="outlined-required"
          label="Description"
          defaultValue=""
          onChange={(e)=>setDescription(e.target.value)}
        />
          <br></br>
        <TextField
          required
          id="outlined-required"
          label="Price"
          defaultValue=""
          type='number'
          onChange={(e)=>setPrice(e.target.value)}
        />
          <br></br>
        <TextField
          required
          id="outlined-required"
          label="Image-Link"
          defaultValue=""
          type='url'
          onChange={(e)=>setImageLink(e.target.value)}
        />
          <br></br>
        <TextField
          required
          id="outlined-required"
          label="Published"
          defaultValue=""
          onChange={(e)=>setPublished(e.target.value)}
        />
        <Button className='button' variant="contained" onClick={handleCreate}>CREATE</Button>
       
        </CardContent>
        </Card>
    </>)
}
export default CreateCourse;