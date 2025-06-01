import express from "express";
import {
  getPlaylist,
  updatePlaylistDetails,
  //   updatePlaylistTracks,
  getPlaylistImage,
} from "../controllers/playlists.controller.js";

const router = express.Router();

router.get("/:id", getPlaylist);
router.get("/:id", updatePlaylistDetails);
router.get("/:id/images", getPlaylistImage);
// router.get("/:id/tracks", updatePlaylistTracks);

export default router;
