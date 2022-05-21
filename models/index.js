// import all models
const Post = require('./Post');
const User = require('./User');
const Heart = require('./Heart');
const Comment = require('./Comment');
const Interested = require('./Interested');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.belongsToMany(Post, {
  through: Heart,
  as: 'Hearted_posts',

  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Heart,
  as: 'Hearted_posts',
  
  foreignKey: 'post_id'
});

Heart.belongsTo(User, {
  foreignKey: 'user_id'
});

Heart.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Heart, {
  foreignKey: 'user_id'
});

Post.hasMany(Heart, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

//Begin Interested in test associations:
Interested.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Interested, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Heart, Comment, Interested };