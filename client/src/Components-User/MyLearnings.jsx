import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Button } from '@mui/material';

function MyLearnings() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/purchasedCourses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { purchasedCourses } = response.data;
        setCourses(purchasedCourses);
       
      } catch (e) {
        console.error('Error while fetching', e);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>My Learnings</h1>
      <div className='container'>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course, index) => (
            <Card key={index} className="card" style={{ borderRadius: '10px' }}>
              <CardMedia
                component="img"
                height="150"
                image={course.imageLink}
                alt="Course Image"
              />
              <CardContent>
              <li  className="list">
             <strong>{course.title} </strong> 
             <br></br>
              {course.description}
              <br></br>
             <strong>₹{course.price}</strong> 
             
              <br></br>
              <Button variant="contained" >View Details</Button>
              
            </li>
            
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No Courses Purchased</p>
        )}
      </div>
    </div>
  );
}

export default MyLearnings;
