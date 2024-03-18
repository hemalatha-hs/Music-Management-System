import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SongList.css'; 

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    axios.get('http://localhost:8080/songs') 
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  };

  return (
    <div className="song-list-container">
      <h2 className='h1'>Song List</h2>
      <table className="song-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Length</th>
            <th>Album ID</th>
          </tr>
        </thead>
        <tbody>
          {songs.map(song => (
            <tr key={song.song_id}>
              <td>{song.song_id}</td>
              <td>{song.title}</td>
              <td>{song.length}</td>
              <td>{song.album_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
