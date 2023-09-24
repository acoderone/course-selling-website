import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { Card, CardContent,Button ,CardMedia} from "@mui/material";
import './ShowCourses.css';
import { useNavigate } from "react-router-dom";
const PORT=process.env.PORT;
function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const navigate=useNavigate();
    const editCourse=(course)=>{
        
     navigate(`/admin/editCourses/${course.id}`);
    }
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(()=>{
        const token=localStorage.getItem('token');

        const fetchCourses=async()=>{
            try{
                const response=await axios.get(`http://localhost:${PORT}/admin/courses`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                })
                const { courses } = response.data;
                setCourses(courses);
            }
            catch(e){
                console.error('Error while fetching courses:', e);
            }
        };
        fetchCourses();
    },[])
    return <div>
        <h1>COURSES</h1>
        <div className="container">
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
              <Button variant="contained" onClick={()=>editCourse(course)}>EDIT</Button>
              
            </li>
      </CardContent>
      
    </Card>
           
          ))}
        </div>
      
    </div>
}



export default ShowCourses;