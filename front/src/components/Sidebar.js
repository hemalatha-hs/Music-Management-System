import React, { useState } from "react";
import AlbumList from "./AlbumList";
import ArtistList from "./ArtistList";
import AddArtist from "./AddArtist";
import AddAlbum from "./AddAlbum";
import UpdateAlbum from "./UpdateAlbum";
import DeleteAlbum from "./DeleteAlbum";
import SongList from "./SongList";
import AddSong from "./AddSong";
import PlaylistList from "./PlaylistList";
import AddPlaylist from "./AddPlaylist";
import UpdatePlaylist from "./UpdatePlaylist";
import DeletePlaylist from "./DeletePlaylist";
import UpdateSong from "./UpdateSong";
import DeleteSong from "./DeleteSong";
import UpdateArtist from "./UpdateArtist"; 
import DeleteArtist from "./DeleteArtist"; 
import TriggeredData from "./TriggeredData";
import '../styles/sidebar.css'
// import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';


const Sidebar = () => {
  const [selected, setSelected] = useState(null);
  const [showAddArtist, setShowAddArtist] = useState(false);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [showAlbumOptions, setShowAlbumOptions] = useState(false);
  const [showArtistOptions, setShowArtistOptions] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [showSongOptions, setShowSongOptions] = useState(false);
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const [showPlaylistOptions, setShowPlaylistOptions] = useState(false);
  const [showUpdatePlaylist, setShowUpdatePlaylist] = useState(false);
  const [showDeletePlaylist, setShowDeletePlaylist] = useState(false);
  const [showUpdateSong, setShowUpdateSong] = useState(false);
  const [showDeleteSong, setShowDeleteSong] = useState(false);
  const [showUpdateAlbum, setShowUpdateAlbum] = useState(false);
  const [showDeleteAlbum, setShowDeleteAlbum] = useState(false);
  const [showUpdateArtist, setShowUpdateArtist] = useState(false); 
  const [showDeleteArtist, setShowDeleteArtist] = useState(false); 
  const [showTriggeredData, setShowTriggeredData] = useState(false);
  const [ShowAboutUs, setShowAboutUs] = useState(false); 
  const [ShowContactUs,setShowContactUs] = useState(false);

  const handleItemClick = (item) => {
    setSelected(item);
    setShowAlbumOptions(false);
    setShowArtistOptions(false);
    setShowPlaylistOptions(false);
    setShowSongOptions(false);
    setShowAddArtist(false);
    setShowUpdatePlaylist(false);
    setShowDeletePlaylist(false);
    setShowUpdateSong(false);
    setShowDeleteSong(false);
    setShowUpdateAlbum(false);
    setShowDeleteAlbum(false);
    setShowUpdateArtist(false); 
    setShowDeleteArtist(false);
    setShowTriggeredData(false); 
    // setShowAboutUs(false); 
    // setShowContactUs(false);
    
  };

  const handleAlbumClick = () => {
    setShowAlbumOptions(!showAlbumOptions);
  };

  const handleArtistClick = () => {
    setShowArtistOptions(!showArtistOptions);
  };

  const handlePlaylistClick = () => {
    setShowPlaylistOptions(!showPlaylistOptions);
  };

  const handleSongClick = () => {
    setShowSongOptions(!showSongOptions);
  };

  const handleUpdatePlaylistClick = () => {
    setShowUpdatePlaylist(!showUpdatePlaylist);
  };

  const handleDeletePlaylistClick = () => {
    setShowDeletePlaylist(!showDeletePlaylist);
  };

  const handleUpdateSongClick = () => {
    setShowUpdateSong(!showUpdateSong);
  };

  const handleDeleteSongClick = () => {
    setShowDeleteSong(!showDeleteSong);
  };

  const handleUpdateAlbumClick = () => {
    setShowUpdateAlbum(!showUpdateAlbum);
  };

  const handleDeleteAlbumClick = () => {
    setShowDeleteAlbum(!showDeleteAlbum);
  };

  const handleUpdateArtistClick = () => {
    setShowUpdateArtist(!showUpdateArtist);
  };

  const handleDeleteArtistClick = () => {
    setShowDeleteArtist(!showDeleteArtist);
  };

  const handleTriggeredDataClick = () => {
    setShowTriggeredData(true);
    setSelected(null); 
  };
  

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Music.io</h1>
        <ul>
        
        
          {/* <div onClick={() => handleItemClick("home")}>
            <li>Home</li>
          </div> */}
          <div onClick={handleAlbumClick}>
            <li>Album</li>
          </div>
          {showAlbumOptions && (
            <div>
              <div onClick={() => handleItemClick("addAlbum")}>
                <li>Add Album</li>
              </div>
              <div onClick={() => handleItemClick("listAlbums")}>
                <li>List Albums</li>
              </div>
              <div onClick={() => handleItemClick("updateAlbum")}>
                <li>Update Album</li>
              </div>
              <div onClick={() => handleItemClick("deleteAlbum")}>
                <li>Delete Album</li>
              </div>
            </div>
          )}
          <div onClick={handleArtistClick}>
            <li>Artists</li>
          </div>
          {showArtistOptions && (
            <div>
              <div onClick={() => handleItemClick("addArtist")}>
                <li>Add Artist</li>
              </div>
              <div onClick={() => handleItemClick("listArtists")}>
                <li>List Artists</li>
              </div>
              <div onClick={() => handleItemClick("updateArtist")}>
                <li>Update Artist</li>
              </div>
              <div onClick={() => handleItemClick("deleteArtist")}>
                <li>Delete Artist</li>
              </div>
            </div>
          )}
          <div onClick={handleSongClick}>
            <li>Song</li>
          </div>
          {showSongOptions && (
            <div>
              <div onClick={() => handleItemClick("addSong")}>
                <li>Add Song</li>
              </div>
              <div onClick={() => handleItemClick("listSongs")}>
                <li>List Song</li>
              </div>
              <div onClick={() => handleItemClick("updateSong")}>
                <li>Update Song</li>
              </div>
              <div onClick={() => handleItemClick("deleteSong")}>
                <li>Delete Song</li>
              </div>
            </div>
          )}
          <div onClick={handlePlaylistClick}>
            <li>Playlists</li>
          </div>
          {showPlaylistOptions && (
            <div>
              <div onClick={() => handleItemClick("addPlaylist")}>
                <li>Add Playlist</li>
              </div>
              <div onClick={() => handleItemClick("listPlaylists")}>
                <li>List Playlists</li>
              </div>
              <div onClick={() => handleItemClick("updatePlaylist")}>
                <li>Update Playlist</li>
              </div>
              <div onClick={() => handleItemClick("deletePlaylist")}>
                <li>Delete Playlist</li>
              </div>
            </div>
          )}
          <div onClick={handleTriggeredDataClick}>
            <li>Triggered Data</li>
          </div>
          {/* <div onClick={() => handleItemClick("aboutUs")}>
          <li>About Us</li>
</div>
<div onClick={() => handleItemClick("contactUs")}>
    <li>Contact Us</li>
</div> */}
        </ul>
      </div>
      <div className="main-content">
        {/* {selected === "home" && <h2>Welcome to Music.io</h2>} */}
        {selected === "listAlbums" && <AlbumList />}
        {selected === "listArtists" && <ArtistList />}
        {selected === "listSongs" && <SongList />}
        {selected === "listPlaylists" && <PlaylistList />}
        {selected === "addArtist" && <AddArtist />}
        {selected === "addAlbum" && <AddAlbum />}
        {selected === "addSong" && <AddSong />}
        {selected === "addPlaylist" && <AddPlaylist />}
        {selected === "updatePlaylist" && <UpdatePlaylist />}
        {selected === "deletePlaylist" && <DeletePlaylist />}
        {selected === "updateSong" && <UpdateSong />}
        {selected === "deleteSong" && <DeleteSong />}
        {selected === "updateAlbum" && <UpdateAlbum />} 
        {selected === "deleteAlbum" && <DeleteAlbum />}
        {selected === "updateArtist" && <UpdateArtist />} 
        {selected === "deleteArtist" && <DeleteArtist />} 
        {showTriggeredData && <TriggeredData />}
        {/* {selected === "aboutUs" && <AboutUs />}
        {selected === "contactUs" && <ContactUs />} */}
      </div>
    </div>
  );
};

export default Sidebar;

