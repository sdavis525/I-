const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Heart } = require('../models');

// GET POSTS FOR HOMEPAGE
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'), 'heart_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //loop over and map each sequelize object into a serialized version of itself
            const posts = dbPostData.map(post => post.get({ plain: true }));
            //render object 'posts' to homepage.handlebars file
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//GET SINGLE POST FOR SINGLE-POST PAGE
router.get('/posts/:id', (req, res) => {
    console.log(req.session);
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'), 'heart_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //loop over and map each sequelize object into a serialized version of itself
            const posts = dbPostData.get({ plain: true });
            //render object 'posts' to homepage.handlebars file
            res.render('single-post', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//LOGIN
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  res.render('login');
});

module.exports = router;