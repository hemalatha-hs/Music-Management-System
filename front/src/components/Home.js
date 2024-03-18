// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => {
  return (
    <div className='container1'>
      <h2 className='h'>Welcome to Music.io</h2>
      <p classname='pa'>Manage your music effortlessly!</p>
      <div>
        <Link to="/login">
          <button className='l'>Login</button>
        </Link>
        <Link to="/signup">
          <button className='l'>Signup</button>
        </Link>
        <Link to="/about">
          <button className='l'>About Us</button>
        </Link>
        <Link to="/contact">
          <button className='l'>Contact Us</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;



