import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArtist = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [formData, setFormData] = useState({
    artist_id: '',
    name: '',
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      artist_id: artist.artist_id,
      name: artist.name,
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
      const response = await axios.put(`http://localhost:8080/artists/${selectedArtist.artist_id}`, formData);
      console.log('Artist updated successfully:', response.data);
      alert('Artist updated successfully!');
      fetchArtists(); 
      setSelectedArtist(null); 
      setFormData({ artist_id: '', name: '' }); 
    } catch (error) {
      console.error('Error updating artist:', error);
      alert('Error updating the artist!');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Artist</h2>
      <select onChange={(e) => handleSelectArtist(JSON.parse(e.target.value))}>
        <option value="null">Select Artist</option>
        {artists.map((artist) => (
          <option key={artist.artist_id} value={JSON.stringify(artist)}>
            {artist.name}
          </option>
        ))}
      </select>
      {selectedArtist && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              Artist ID:
              <input
                type="number"
                name="artist_id"
                value={formData.artist_id}
                onChange={handleChange}
                disabled 
              />
            </label>
          </div>
          <div className="row">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Update Artist</button>
        </form>
      )}
    </div>
  );
};

export default UpdateArtist;
