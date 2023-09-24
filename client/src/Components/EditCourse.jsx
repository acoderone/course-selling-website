import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const PORT=process.env.PORT;
function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:${PORT}/admin/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data.course);
        setTitle(response.data.course.title);
        setDescription(response.data.course.description);
        setPrice(response.data.course.price);
        setUrl(response.data.course.url);
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error(error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:${PORT}/admin/courses/${courseId}`,
        { title, price, description, url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the course with the edited information
      setCourse({
        ...course,
        title,
        description,
        price,
        url,
      });

     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     {course && 
      <Card className="card" style={{ borderRadius: '10px' }}>
        <CardMedia
          component="img"
          height="150"
          image={course.imageLink}
          alt="Course Image"
        />
        <CardContent>
          <li className="list">
            <strong>{course.title} </strong>
            <br />
            {course.description}
            <br />
            <strong>₹{course.price}</strong>
          </li>
        </CardContent>
      </Card>
     } 

      <Card className='card'>
        <h1>Edit Course</h1>
        <CardContent className='Card-Content'>
          <TextField
            required
            id='outlined-required'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            required
            id='outlined-required'
            label='Image-Link'
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          <Button className='button' variant='contained' onClick={handleEdit}>
            Edit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCourse;
