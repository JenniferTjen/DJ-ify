import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = "";
let tokenExpiresAt = 0;

export async function getAccessToken() {
  const now = Date.now();

  // If token is still valid, return it
  if (accessToken && now < tokenExpiresAt) {
    return accessToken;
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await axios.post(tokenUrl, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = response.data.access_token;

    tokenExpiresAt = now + response.data.expires_in * 1000 - 5 * 60 * 1000;
    // console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error(
      "Failed to fetch access token",
      error.response?.data || error
    );
    throw new Error("Could not get Spotify access token");
  }
}
