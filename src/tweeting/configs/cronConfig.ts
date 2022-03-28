export const cronConfig = {
  likingTweets: {
    schedule: '*/28 * * * *',
    isRunning: true,
  },
  retweetingTweets: {
    schedule: '*/23 * * * *',
    isRunning: true,
  },
  creatingTweets: {
    schedule: '*/35 * * * *',
    isRunning: false,
  },
  creatingOpenAiTweets: {
    schedule: '*/35 * * * *',
    isRunning: true,
  },
  creatingDevToTweets: {
    schedule: '*/32 * * * *',
    isRunning: true,
  },
};
