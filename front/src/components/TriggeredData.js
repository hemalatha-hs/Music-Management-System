import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TriggeredData.css';

const TriggeredData = () => {
  const [totalSongs, setTotalSongs] = useState(0);

  useEffect(() => {
    fetchTriggeredData();
  }, []);

  const fetchTriggeredData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/triggered_data');
      if (response.data.length > 0) {
        setTotalSongs(response.data[0].total_songs);
      } else {
        console.error('No data returned from the API');
      }
    } catch (error) {
      console.error('Error fetching triggered data:', error);
    }
  };

  return (
    <div className='triggered-data'>
      <h2 className='trigger'>Triggered Data</h2>
      <p className='songs'>Total Songs: {totalSongs}</p>
    </div>
  );
};

export default TriggeredData;
