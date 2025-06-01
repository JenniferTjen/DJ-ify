import express from "express";
import cors from "cors";
import playlistRoutes from "./routes/playlists.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/playlist", playlistRoutes);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
