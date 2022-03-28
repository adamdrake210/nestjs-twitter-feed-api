const isDev = process.env.NODE_ENV === 'development';

export const cronConfig = {
  likingTweets: {
    schedule: '*/28 * * * *',
    isRunning: !isDev && true,
  },
  retweetingTweets: {
    schedule: '*/23 * * * *',
    isRunning: !isDev && true,
  },
  creatingTweets: {
    schedule: '*/35 * * * *',
    isRunning: !isDev && false,
  },
  creatingOpenAiTweets: {
    schedule: '*/35 * * * *',
    isRunning: !isDev && true,
  },
  creatingDevToTweets: {
    schedule: '*/32 * * * *',
    isRunning: !isDev && true,
  },
};
