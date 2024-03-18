import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AlbumList.css'

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8080/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  return (
    <div className="album-list-container">
      <h2 className='h1'>Album List</h2>
      <table className="album-table">
        <thead>
          <tr>
            <th>Album ID</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Artist ID</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.album_id}>
              <td>{album.album_id}</td>
              <td>{album.title}</td>
              <td>{album.release_date}</td>
              <td>{album.artist_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumList;
