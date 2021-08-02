const dummy = () => {
  return 1;
};

const totalLikes = (postsArray) => {
  return postsArray.map((post) => post.likes).reduce((m, n) => m + n, 0);
};

const favouriteBlog = (postsArray) => {
  if (postsArray.length === 0) {
    return {};
  }
  const maxPost = postsArray.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
  return { author: maxPost.author, title: maxPost.title, likes: maxPost.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
