import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ArtistList.css'

const ArtistList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = () => {
    axios.get('http://localhost:8080/artists')
      .then(response => {
        setArtists(response.data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });
  };

  return (
    <div className="artist-list-container">
      <h2 className='h1'>Artist List</h2>
      <table className="artist-table">
        <thead>
          <tr>
            <th>Artist ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {artists.map(artist => (
            <tr key={artist.artist_id}>
              <td>{artist.artist_id}</td>
              <td>{artist.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistList;
