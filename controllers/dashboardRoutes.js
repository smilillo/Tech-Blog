const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
      where: {user_id: req.session.user_id},
      attributes: [
        'id', 'title', 'post_text', 'user_id'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id'],
          include: {
              model: User,
              attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username'],
        }
      ],
    })
    .then(data => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render('dashboard', { 
        posts, 
        loggedIn: req.session.logged_in 
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

  router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
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
      .then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('new-post', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  module.exports = router;