import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout,isAdmin }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link style={{ textDecoration: 'none' }} to='/'>COURSERA</Link>
      </div>
      <ul className="navbar-nav">
      {isAdmin?
        <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'green' }} to='/admin/courses'>Courses</Link></li>
        :
        <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'green' }} to='/user/courses'>Courses</Link></li>
      }
       
      {isAdmin? 
        <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'green' }} to='/admin/createCourses'>Create Courses</Link></li>
        :
        <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'green' }} to='/user/MyLearnings'>My Learnings</Link></li>
      }

       
        {isLoggedIn ?
          <li className="nav-item">
            <Link onClick={onLogout} style={{ textDecoration: 'none', color: 'green' }} to='/admin/Login'>Logout</Link>
          </li>
          :
          <li className="nav-item">
            <Link style={{ textDecoration: 'none', color: 'green' }} to='/admin/Login'>Login</Link>
          </li>
        }
        <li className="nav-item"><Link style={{ textDecoration: 'none', color: 'green' }} to='/admin/Signup'>Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
