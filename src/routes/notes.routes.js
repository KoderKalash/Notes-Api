const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/notes.controllers');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// simple disk storage for dev
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadsDir); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});
const upload = multer({ storage });

router.get('/', auth, noteCtrl.getNotes);
router.post('/', auth, upload.single('image'), noteCtrl.createNote);
router.get('/:id', auth, noteCtrl.getNote);
router.put('/:id', auth, upload.single('image'), noteCtrl.updateNote);
router.delete('/:id', auth, noteCtrl.deleteNote);

module.exports = router;
