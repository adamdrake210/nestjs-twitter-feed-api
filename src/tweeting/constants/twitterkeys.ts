import 'dotenv/config';

export const twitterKeys = {
  apiKey: process.env.TWITTER_API_KEY,
  apiKeySecret: process.env.TWITTER_API_KEY_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  myId: process.env.MY_TWITTER_ID,
};
