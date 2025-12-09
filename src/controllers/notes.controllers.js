const Note = require('../models/note.model');

exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const note = await Note.create({ title, content, imageUrl, owner: req.user._id });
    res.status(201).json(note);
  } catch (err) { next(err); }
};

exports.getNotes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const filter = { owner: req.user._id };
    if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') }];

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Note.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Note.countDocuments(filter)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (String(note.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    res.json(note);
  } catch (err) { next(err); }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (String(note.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const updates = { title: req.body.title, content: req.body.content };
    if (req.file) updates.imageUrl = `/uploads/${req.file.filename}`;
    const updated = await Note.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (String(note.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await note.remove();
    res.json({ message: 'deleted' });
  } catch (err) { next(err); }
};
