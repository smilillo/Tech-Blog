const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id', 'title', 'post_text'],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    .then(data => res.json(data))
    .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
