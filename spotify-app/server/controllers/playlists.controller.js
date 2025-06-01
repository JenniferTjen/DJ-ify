import { getAccessToken } from "../utils/spotifyTokenManager.js";
import axios from "axios";

export const getPlaylist = async (req, res) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
};

export const updatePlaylistDetails = async (req, res) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const { name, description, public: isPublic, collaborative } = req.body;

    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        name,
        description,
        public: isPublic,
        collaborative,
      },
      {
        headers: { Authorization: `Bearer: ${token}` },
      }
    );

    res.json({ message: "Playlist updated", response: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update playlist" });
  }
};

export const getPlaylistImage = async (req, res) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/images`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve image" });
  }
};
