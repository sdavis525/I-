const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Heart } = require('../models');
const withAuth = require('../utils/auth');

//GET ALL POSTS for dashboard   -   /dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id', 
            'post_text',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'),
              'heart_count'
            ]
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                //include comments on posts
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    //include who made the comment
                    model: User,
                    attributes: ['username']
                }
            },
            {
                //include who created the post
                model: User,
                attributes: ['username']
            }
        ]
    })
    //serialize the data
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //pass data as posts to dashboard.handlebars template
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


//EDIT A POST   -   /dashboard/edit/:id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
        'post_text', 
        'title', 
        'created_at',
        [
          sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'),
          'heart_count'
        ]
      ],
      include: [
        // include the Comment model
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          //show username of user who made the comment
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          //show username of user who created the post
          model: User,
          attributes: ['username']
        }
      ]
     })
     .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const posts = dbPostData.get({ plain: true });

      // pass data to edit-post.handlebars template (to be made)
      res.render('edit-post', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});







module.exports = router;