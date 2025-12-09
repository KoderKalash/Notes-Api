const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controllers');
const auth = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
