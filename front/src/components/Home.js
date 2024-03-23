import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='container1'>
      <h2 className='h'>Welcome to Music.io</h2>
      <p className='pa'>Manage your music effortlessly!</p>
      <div>
        <Link to="/login">
          <button className='l'>Login</button>
        </Link>
        <Link to="/signup">
          <button className='l'>Signup</button>
        </Link>
        <Link to="/about" className='m'>About Us</Link>
        <Link to="/contact" className='m'>Contact Us</Link>
      </div>
    </div>
  );
};

export default Home;

