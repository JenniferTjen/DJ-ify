import "./App.css";
import CustomButton from "./components/Button/CustomButton.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";

function App() {
  const handleClick = async () => {
    const spotifyId = extractPlaylistId(url);
    console.log(spotifyId);

    try {
      const retrieveDetails = `http://localhost:4000/api/playlist/${spotifyId}`;
      const retrieveImage = `http://localhost:4000/api/playlist/${spotifyId}/images`;
      const res = await axios.get(retrieveDetails);
      const resTwo = await axios.get(retrieveImage);
      console.log(res.data);
      console.log(resTwo.data);
      setPlaylist({
        title: res.data.name,
        description: res.data.description,
        imageUrl: resTwo.data[0].url,
      });
    } catch (err) {
      console.error(
        "Error fetching playlist:",
        err.response?.data || err.message || err
      );
    }
  };

  const [isFetched, setIsFetched] = useState(false);
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState({
    title: "My Playlist",
    description: "Some tracks",
    imageUrl: "http://example.com/image.jpg",
  });

  useEffect(() => {
    setIsFetched(true);
  }, [playlist]);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  function extractPlaylistId(spotifyUrl) {
    const path = new URL(spotifyUrl).pathname;
    const parts = path.split("/");
    return parts[2];
  }

  return (
    <div className="App">
      {isFetched && (
        <Box className="Playlist">
          <img className="PlaylistImage" src={playlist.imageUrl} />
          <Box>
            <Typography
              className="PlaylistTitle"
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              {playlist.title}
            </Typography>
            <Typography variant="caption">{playlist.description}</Typography>
          </Box>
        </Box>
      )}
      <TextField
        label="Spotify URL"
        value={url}
        InputLabelProps={{
          style: { color: "rgb(30, 215, 96)" }, // Green label
        }}
        InputProps={{
          style: { color: "rgb(0, 0, 0)" }, // Green input text
        }}
        sx={{
          color: "black",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(30, 215, 96, 0.5)", // Normal border
            },
            "&:hover fieldset": {
              borderColor: "rgb(30, 215, 96)", // Hover state
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(30, 215, 96)", // Focused state
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "rgb(0, 0, 0)", // Label color when focused
          },
        }}
        onChange={handleChange}
      />
      <CustomButton text="Click Me" onClick={handleClick} />
    </div>
  );
}

export default App;
