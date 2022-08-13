import axios from "axios";

export const twitchGetOauthToken = async (code) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = {
    clientId: process.env.NEXT_PUBLIC_TWITCH_API_CLIENT_ID,
    returnUrl: process.env.NEXT_PUBLIC_TWITCH_URL_REDIRECT,
    code,
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_API}/twitch-oauth-token`,
    data,
    config
  );

  return response.data;
};

export const twitchGetUserDetails = async (oauthToken) => {
  const response = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      "Client-ID": process.env.NEXT_PUBLIC_TWITCH_API_CLIENT_ID,
      Authorization: `Bearer ${oauthToken}`,
    },
  });

  return response.data.data[0];
};
