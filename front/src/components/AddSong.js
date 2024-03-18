import React, { useState } from "react";
import axios from "axios";

const AddSong = () => {
  const [formData, setFormData] = useState({
    song_id: "",
    title: "",
    length: "",
    album_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Optional validation for number inputs (length, song_id)
    if (name === "length" || name === "song_id") {
      const isNumber = !isNaN(value);
      if (!isNumber) {
        return; // Prevent invalid numbers
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Show loading state (e.g., disable button, display spinner)
    // ...

    try {
      const response = await axios.post("http://localhost:8080/add_song", formData);
      console.log("Song added successfully:", response.data);
      alert("Song added successfully!");
      setFormData({
        song_id: "",
        title: "",
        length: "",
        album_id: "",
      });
    } catch (error) {
      console.error("Error adding song:", error);
      alert("Error adding the song!");
    } finally {
      // Optional: Hide loading state
      // ...
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <b><h2>Add Song</h2></b>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              <b>Song ID:</b>
              <input
                type="number"
                name="song_id"
                value={formData.song_id}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <b>Title:</b>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="row">
            <label>
              <b>Length:</b>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <b>Album ID:</b>
              <input
                type="number"
                name="album_id"
                value={formData.album_id}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button className="add-song-button" type="submit"><b>Submit</b></button>
        </form>
      </div>
    </div>
  );
};

export default AddSong;

