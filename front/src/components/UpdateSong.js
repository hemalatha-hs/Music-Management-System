import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSong = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [formData, setFormData] = useState({
    song_id: '',
    title: '',
    length: '',
    album_id: '',
  });

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setFormData({
      song_id: song.song_id,
      title: song.title,
      length: song.length,
      album_id: song.album_id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/songs/${selectedSong.song_id}`, formData);
      console.log('Song updated successfully:', response.data);
      alert('Song updated successfully!');
      fetchSongs(); 
      setSelectedSong(null); 
      setFormData({ song_id: '', title: '', length: '', album_id: '' }); 
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Error updating the song!');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Song</h2>
      <select onChange={(e) => handleSelectSong(JSON.parse(e.target.value))}>
        <option value="null">Select Song</option>
        {songs.map((song) => (
          <option key={song.song_id} value={JSON.stringify(song)}>
            {song.title}
          </option>
        ))}
      </select>
      {selectedSong && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              Song ID:
              <input
                type="number"
                name="song_id"
                value={formData.song_id}
                onChange={handleChange}
                disabled 
              />
            </label>
          </div>
          <div className="row">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Length:
              <input
                type="text"
                name="length"
                value={formData.length}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Album ID:
              <input
                type="number"
                name="album_id"
                value={formData.album_id}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Update Song</button>
        </form>
      )}
    </div>
  );
};

export default UpdateSong;
