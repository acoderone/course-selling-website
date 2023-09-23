import React from "react";
import './Landing.css'
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    return <div>
    <div className="Welcome">
    <h1>Welcome to COURSERA!</h1>
    
    <img src="https://media0.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.webp?cid=ecf05e474wj85mbi1s9gnaoioak63opzybmgpr9it399rth1&rid=giphy.webp" alt="img"/>
    </div>
        
      
        
    </div>
}

export default Landing;