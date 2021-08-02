const _ = require("lodash");

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

const mostBlogs = (postArray) => {
  const authors = _.countBy(postArray, (x) => x.author);
  const maxBlogs = _(authors).values().max();
  const author = _.invert(authors)[maxBlogs];
  return { author, blogs: maxBlogs };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
