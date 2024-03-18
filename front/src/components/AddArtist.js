import React, { useState } from "react";
import axios from "axios";
import "../styles/AddArtist.css";

const AddArtist = () => {
  const [formData, setFormData] = useState({
    artist_id: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/add_artist", formData)
      .then((response) => {
        console.log("Artist added successfully:", response.data);
        alert("Artist added successfully!");
        // Reset the form after successful submission
        setFormData({
          artist_id: "",
          name: "",
        });
      })
      .catch((error) => {
        console.error("Error adding artist:", error);
        alert("Error adding the artist!")
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add Artist</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="artist_id">Artist ID:</label>
            <input
              type="number"
              id="artist_id"
              name="artist_id"
              value={formData.artist_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <button className="add-song-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddArtist;
