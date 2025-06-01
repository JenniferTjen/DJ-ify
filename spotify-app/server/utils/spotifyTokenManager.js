import axios from "axios";
import qs from "qs";

const clientId = "34eec48c51b347a2990dc5bb7bc17fae";
const clientSecret = "49285cd7269c4473be84e79d316a6526";

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
