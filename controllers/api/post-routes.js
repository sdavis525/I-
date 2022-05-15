const router = require('express').Router();
const { Post, User, Comment, Like } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');




//GET ALL POSTS  -  /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_text',
            'user_id',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                //to show username of user who made the comment
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})


//GET INDIVIDUAL POST
router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
        'post_text', 
        'title', 
        'created_at',
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        // [
        //   sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'),
        //   'like_count'
        // ]
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


//CREATE POST
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        //find user id based off off session object
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//LIKE A POST
router.put('/like', withAuth, (req, res) => {
    Like.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(() => {
        // then find the post we just voted on
        return Post.findOne({
          where: {
            id: req.body.post_id
          },
          attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            // use raw MySQL aggregate function query to get a count of how many likes the post has and return it under the name `like_count`
            // [
            //   sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'),
            //   'like_count'
            // ]
          ]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    })
})


//EDIT POST
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//DELETE POST
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});






module.exports = router;