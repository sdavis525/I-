const router = require('express').Router();

const userRoutes = require('./user-routes.js');
<<<<<<< HEAD
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
=======
// const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
>>>>>>> 37ef8606e6164becdaa5cd84bc94613f6329d373

module.exports = router;
