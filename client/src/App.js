import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
          
const [loggedIn, setloggedIn] = useState(false);
  function handleLogout(){
    setloggedIn(false)
    localStorage.removeItem('id_token');
  }
    return (
      <div className="container">
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Forum.me</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/profile" className="nav-link" >Profile</Link>
          </li>
          <li className="navbar-item">
          {loggedIn ? (<Link to="" onClick={ handleLogout } className="nav-link">Logout</Link>) : (<Link to="/login" className="nav-link">Login</Link>) }
          </li>
        </ul>
        </div>
      </nav>
      <Routes appProps = {{ loggedIn, setloggedIn }}/>
     </div>
  )
 }
