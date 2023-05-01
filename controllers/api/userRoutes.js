const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['username']
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: ['username']
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found'});
            return;
        }
            res.json(data)
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(data => {
    req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.logged_in = true;
  
        res.json(userData);
      });
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/login', (req, res) => {
    User.findOne({ 
        where: { username: req.body.username } })
    .then(data => {
    if (!data) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.logged_in = true;
      
      res.json({ user: data, message: 'You are now logged in!' });
    });
    })
    .catch(err => {
        res.status(500).json(err);
     });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update user route

// delete user route

module.exports = router;
