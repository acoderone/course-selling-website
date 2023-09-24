import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Button ,CardMedia} from '@mui/material';
import './Courses.css'
const PORT=process.env.PORT || 8000;
function Courses() {
  const [courses, setCourses] = useState([]);
 const[Error,setError]=useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/admin/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { courses } = response.data;
        setCourses(courses);
        
      } catch (e) {
        console.error('Error while fetching', e);
        setCourses([]); // Set an empty array in case of an error to avoid undefined
      }
    };
    fetchCourses();
  }, []);
 
  const handleClick=async(courseId)=>{
    const token=localStorage.getItem('token');
   
    try{
      const response=await axios.post(`http://localhost:8000/users/courses/${courseId}`,{},{
         headers:{
          Authorization:`Bearer ${token}`,
         },
      });
      if(response.status===200){
        alert('Course is Purchased');
      }
      
    }
    catch(e){
      setError('An error occurred during login. Please try again later.');
    }
  }
  
  return (
    <div>
      <h1>Courses</h1>
      <div className='Courses'>
        {courses.map((course,index) => (
            <Card key={index} className="card" style={{borderRadius:'10px'}}>
            <CardMedia
        component="img"
        height="150"
        image={course.imageLink}
        alt="Paella dish"
      />
      <CardContent>
      <li  className="list">
             <strong>{course.title} </strong> 
             <br></br>
              {course.description}
              <br></br>
             <strong>₹{course.price}</strong> 
             
              <br></br>
              <Button variant="contained" onClick={()=>handleClick(course._id)}>BUY</Button>
              
            </li>
            {Error && <div className="error-message">{Error}</div>}
      </CardContent>
     
    </Card>
           
          ))}
      </div>
    </div>
  );
}

export default Courses;
