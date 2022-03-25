const findingTwitterHandle = (twitter_username: string | null) => {
  if (twitter_username) {
    return `It was written by @${twitter_username}`;
  }
  return '';
};

export const craftingTweetFromData = (article: any) => {
  try {
    return `Read this very interesting article ${
      article.url
    } ${findingTwitterHandle(article.user.twitter_username)} #${
      article.tag_list[0]
    }`;
  } catch (error) {
    console.error('craftTweetError: ', error);
  }
};
