
const router = require('express').Router();
<<<<<<< HEAD
const { Post, User, Comment } = require('../../models');
=======
const { Post, User, Comment, Heart } = require('../../models');
>>>>>>> 852191127d5be31cdc76eb95221ba213091f473b
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
            [sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'), 'heart_count']
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
router.get('/:id', (req, res) => {
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
        [
          sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'),'heart_count'
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
      res.json(dbPostData);
    })
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

//Heart A POST
router.put('/heart', withAuth, (req, res) => {
    //use custom static method created in models/Post.js
    Post.heart({ ...req.body, user_id: req.session.user_id }, { Heart, Comment, User })
    .then(updatedHeartData => res.json(updatedHeartData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


//EDIT POST
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
<<<<<<< HEAD
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
    })
=======
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
>>>>>>> 852191127d5be31cdc76eb95221ba213091f473b
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
<<<<<<< HEAD
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
=======
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




>>>>>>> 852191127d5be31cdc76eb95221ba213091f473b


module.exports = router;