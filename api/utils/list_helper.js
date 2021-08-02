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

const mostLikes = (postArray) => {
  let authorLikes = postArray.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0;
    op[author] += likes;
    return op;
  }, {});
  const maxLikes = _(authorLikes).values().max();
  const author = _.invert(authorLikes)[maxLikes];
  return { author, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
