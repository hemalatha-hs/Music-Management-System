import React, { useState } from "react";
import axios from "axios";

const AddPlaylist = () => {
  const [playlistData, setPlaylistData] = useState({
    playlist_id: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/add_playlist", playlistData)
      .then((response) => {
        console.log("Playlist added successfully:", response.data);
        alert("Playlist added successfully!");
        setPlaylistData({
          playlist_id: "",
          title: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error adding playlist:", error);
        alert("Error adding the playlist!");
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              Playlist ID:
              <input
                type="number"
                name="playlist_id"
                value={playlistData.playlist_id}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={playlistData.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="row">
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={playlistData.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button className="add-song-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaylist;
