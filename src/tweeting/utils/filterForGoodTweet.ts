export const filterForGoodTweet = (tweets: any[]) => {
  const goodTweets = tweets.filter((tweet) => {
    return (
      !tweet.text.includes('@') &&
      tweet.lang === 'en' &&
      !tweet.text.includes('job')
    );
  });

  if (goodTweets.length > 0) {
    return goodTweets[0];
  }
};
