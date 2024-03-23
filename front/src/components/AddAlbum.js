import React, { useState } from "react";
import axios from "axios";
import "../styles/AddArtist.css";

const AddAlbum = () => {
  const [formData, setFormData] = useState({
    album_id: "",
    title: "",
    release_date: "",
    artist_id: "",
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
      .post("http://localhost:8080/add_album", formData)
      .then((response) => {
        console.log("Album added successfully:", response.data);
        alert("Album added successfully!");
        setFormData({
          album_id: "",
          title: "",
          release_date: "",
          artist_id: "",
        });
      })
      .catch((error) => {
        console.error("Error adding album:", error);
        alert("Error adding the album!")
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <b><h2>Add Album</h2></b>
        <form onSubmit={handleSubmit}>
          <div className="row">
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
              <b>Release Date:</b>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <b>Artist ID:</b>
              <input
                type="number"
                name="artist_id"
                value={formData.artist_id}
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

export default AddAlbum;
