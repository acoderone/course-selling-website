import React, { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
const PORT=process.env.PORT || 8000;
function Login({handleSignin}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminClick = () => {
    navigate('/admin/Login');
  };

  const handleUserClick = () => {
    navigate('/user/Login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:${PORT}/users/login`, {
        username,
        password,
      });
      

      if (response.status===200) {
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        handleSignin(token);
        navigate('/user/myLearnings');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
    }
  };



  return (
    <div>
      <Card className="Card1">
        <h1>LOGIN</h1>
        <CardContent className="Card-Content1">
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue=""
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            required
            id="outlined-required1"
            label="Password"
            defaultValue=""
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonGroup
            className="button-group1"
            disableElevation
            variant="outlined"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={handleAdminClick}>Admin</Button>
            <Button onClick={handleUserClick}>User</Button>
          </ButtonGroup>
          <Button className="button1" variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <div className="Dont-Account1">
            <p>
              Do not have an account? <Link to="/admin/Login">Signup</Link>{' '}
            </p>
          </div>
          {error && <div className="error-message">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
