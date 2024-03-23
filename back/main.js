const express = require("express");
var mysql = require("mysql");
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const connection = require("./db.js");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxx@gmail.com',
    pass: 'aS123456789'
  }
});

// Routes
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO signup (`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.json("Error");
    }
    console.log(data)
    return res.json("Success");
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
  const values = [req.body.email, req.body.password];

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error querying data:", err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/getData", async (req, res) => {
  try {
      const email = req.body.email;

      // Execute the query to find a document based on the email
      const query = `SELECT * FROM signup WHERE email = '${email}'`;
      db.query(query, (err, result) => {
          if (err) {
              console.error("Error retrieving data:", err);
              res.status(500).json({ message: "Internal server error" });
          } else {
              if (result.length > 0) {
                  res.send({ data: result[0] }); // Send the found document as a response
              } else {
                  console.log("No document found for email:", email);
                  res.send({ message: "No document found for email", status: 404 });
              }
          }
      });
  } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to add an album
app.post("/add_album", (req, res) => {
    const { title, release_date, artist_id } = req.body;
  
    const sql = `INSERT INTO Album (title, release_date, artist_id) 
                 VALUES (?, ?, ?)`;
  
    connection.query(sql, [title, release_date, artist_id], (err, result) => {
      if (err) {
        console.error("Error adding album:", err);
        res.status(500).json({ message: "Failed to add album" });
      } else {
        res.status(200).json({ message: "Album added successfully" });
      }
    });
  });
  
  // Endpoint to list albums
  app.get("/albums", (req, res) => {
    const sql = `SELECT * FROM Album`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching albums:', err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });


  // Delete Album
app.delete("/albums/:id", (req, res) => {
  const albumId = req.params.id;

  const sql = `DELETE FROM album WHERE album_id = ?`;

  connection.query(sql, [albumId], (err, result) => {
    if (err) {
      console.error("Error deleting album:", err);
      res.status(500).json({ message: "Failed to delete album" });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Album deleted successfully" });
      } else {
        res.status(404).json({ message: "Album not found" });
      }
    }
  });
});


// Update Album Route
app.put('/albums/:albumId', (req, res) => {
  const { albumId } = req.params;
  const { title, release_date, artist_id } = req.body;

  const updateAlbumQuery = `UPDATE album SET title = ?, release_date = ?, artist_id = ? WHERE album_id = ?`;
  const values = [title, release_date, artist_id, albumId];

  connection.query(updateAlbumQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating album:', err);
      res.status(500).json({ error: 'Error updating album' });
      return;
    }
    console.log('Album updated successfully');
    res.status(200).json({ message: 'Album updated successfully' });
  });
});



  
  // Endpoint to add an artist
  app.post("/add_artist", (req, res) => {
    const { name } = req.body;
  
    const sql = `INSERT INTO Artist (name) VALUES (?)`;
  
    connection.query(sql, [name], (err, result) => {
      if (err) {
        console.error("Error adding artist:", err);
        res.status(500).json({ message: "Failed to add artist" });
      } else {
        res.status(200).json({ message: "Artist added successfully" });
      }
    });
  });
  
  // Endpoint to list artists
  app.get("/artists", (req, res) => {
    const sql = `SELECT * FROM Artist`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching artists:', err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

 // Update Artist
app.put('/artists/:id', (req, res) => {
  const artistId = req.params.id;
  const { name } = req.body;
  const query = 'UPDATE artist SET name = ? WHERE artist_id = ?';
  connection.query(query, [name, artistId], (error, results) => {
    if (error) {
      console.error('Error updating artist:', error);
      res.status(500).json({ error: 'Error updating the artist' });
      return;
    }
    console.log('Artist updated successfully');
    res.status(200).json({ message: 'Artist updated successfully' });
  });
});

// Delete Artist
app.delete('/artists/:id', (req, res) => {
  const artistId = req.params.id;
  const query = 'DELETE FROM artist WHERE artist_id = ?';

  // Execute the delete query
  connection.query(query, [artistId], (error, results) => {
    if (error) {
      console.error('Error deleting artist:', error);
      res.status(500).json({ error: 'Error deleting the artist' });
      return;
    }
    console.log('Artist deleted successfully');
    res.status(200).json({ message: 'Artist deleted successfully' });
  });
});

  // Endpoint to add a song
  app.post("/add_song", (req, res) => {
    const { title, length, album_id } = req.body;
  
    const sql = `INSERT INTO Song (title, length, album_id) VALUES (?, ?, ?)`;
  
    connection.query(sql, [title, length, album_id], (err, result) => {
      if (err) {
        console.error("Error adding song:", err);
        res.status(500).json({ message: "Failed to add song" });
      } else {
        res.status(200).json({ message: "Song added successfully" });
      }
    });
  });
  
  // Endpoint to list songs
  app.get("/songs", (req, res) => {
    const sql = `SELECT * FROM Song`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching songs:', err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

//   // Endpoint to update a song
app.put('/songs/:id', (req, res) => {
  const songId = req.params.id;
  const { title, length, album_id } = req.body;
  const query = 'UPDATE song SET title = ?, length = ?, album_id = ? WHERE song_id = ?';
  connection.query(query, [title, length, album_id, songId], (error, results) => {
    if (error) {
      console.error('Error updating song:', error);
      res.status(500).json({ error: 'Error updating the song' });
      return;
    }
    console.log('Song updated successfully');
    res.status(200).json({ message: 'Song updated successfully' });
  });
});

// Endpoint to delete a song
app.delete('/songs/:id', (req, res) => {
  const songId = req.params.id;

  const sql = 'DELETE FROM song WHERE song_id = ?';

  connection.query(sql, [songId], (err, result) => {
    if (err) {
      console.error('Error deleting song:', err);
      res.status(500).json({ message: 'Failed to delete song' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Song deleted successfully' });
      } else {
        res.status(404).json({ message: 'Song not found' });
      }
    }
  });
});

app.get('/triggered_data', (req, res) => {
  const sql = `SELECT total_songs FROM summary_table`; // Select only the total_songs column

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching triggered data:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});



  
  // Endpoint to add a playlist
app.post("/add_playlist", (req, res) => {
  const { playlist_id, title, description } = req.body;

  const sql = `INSERT INTO Playlist (playlist_id, title, description) 
              VALUES (?, ?, ?)`;

  connection.query(sql, [playlist_id, title, description], (err, result) => {
    if (err) {
      console.error("Error adding playlist:", err);
      res.status(500).json({ message: "Failed to add playlist" });
    } else {
      res.status(200).json({ message: "Playlist added successfully" });
    }
  });
});

// Endpoint to list playlists
app.get("/playlists", (req, res) => {
  const sql = `SELECT * FROM Playlist`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching playlists:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

app.put('/playlists/:id', async (req, res) => {
  const playlist_id = req.params.id;
  const { title, description } = req.body;

  try {
    const sql = `
      UPDATE Playlist
      SET title = ?, description = ?
      WHERE playlist_id = ?
    `;
    const values = [title, description, playlist_id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating playlist:", err);
        res.status(500).json({ message: "Failed to update playlist" });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "Playlist updated successfully" });
        } else {
          res.status(404).json({ message: "Playlist not found" });
        }
      }
    });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Endpoint to delete a playlist
app.delete("/playlists/:id", (req, res) => {
  const playlistId = req.params.id;

  const sql = `DELETE FROM Playlist WHERE playlist_id = ?`;

  connection.query(sql, [playlistId], (err, result) => {
    if (err) {
      console.error("Error deleting playlist:", err);
      res.status(500).json({ message: "Failed to delete playlist" });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Playlist deleted successfully" });
      } else {
        res.status(404).json({ message: "Playlist not found" });
      }
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});