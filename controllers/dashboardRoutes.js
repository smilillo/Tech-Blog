const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
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
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne(req.params.id, {
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
      res.render('edit-post', {
        post,
        logged_in: req.session.logged_in
      });
    })
    .catch (err => {
      res.status(500).json(err);
    })
  });

  router.get('/new', (req, res) => {
    res.render('new-post');
  });

  module.exports = router;