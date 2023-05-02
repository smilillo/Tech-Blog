const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
              model: User,
              attributes: ['username']
          }
        }
      ],
    })
    .then(data => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: { id: req.params.id}, 
    attributes: [
      'id', 'title', 'post-content'
    ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
          }
      ],
    })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found'});
        return;
      }
    const post = data.get({ plain: true });
    res.render('single-post', {
      post,
      logged_in: req.session.logged_in
    });
  })
  .catch (err => {
    res.status(500).json(err);
  })
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})



module.exports = router;
