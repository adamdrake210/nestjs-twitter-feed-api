export const filterForGoodTweet = (tweets: any[]) => {
  const goodTweets = tweets.filter((tweet) => {
    return (
      !tweet.text.includes('@') &&
      tweet.lang === 'en' &&
      !tweet.text.includes('job')
    );
  });

  console.log('goodTweets', goodTweets);

  if (goodTweets.length > 0) {
    return goodTweets[0];
  }
};
