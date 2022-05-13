const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
<<<<<<< HEAD


//GET ALL POSTS  -  
=======
const withAuth = require('../../utils/auth');


//GET ALL POSTS  -  /api/posts
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_text',
            'user_id'
        ],
        include: [
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

//CREATE POST
<<<<<<< HEAD
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        //change to req.session.user_id after session setup
        user_id: req.body.user_id
=======
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        //find user id based off off session object
        user_id: req.session.user_id
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})


//EDIT POST
<<<<<<< HEAD
router.put('/:id', (req, res) => {
=======
router.put('/:id', withAuth, (req, res) => {
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03
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
<<<<<<< HEAD
        .then(dbPostData => res.json(dbPostData))
=======
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
    })
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//DELETE POST
<<<<<<< HEAD
router.delete('/:id', (req, res) => {
=======
router.delete('/:id', withAuth, (req, res) => {
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03
    Post.destroy({
        where: {
            id: req.params.id
        }
    }
    )
<<<<<<< HEAD
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
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
>>>>>>> d29c83bdb79a0a3993c28d49cf87bfeaee370f03


module.exports = router;