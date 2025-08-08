import express from 'express';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';
import User from '../models/User.js';
import tv4 from 'tv4';

const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

const postSchema = {
  type: 'object',
  properties: { content: { type: 'string', minLength: 1 } },
  required: ['content']
};

// Create a post
router.post('/', authMiddleware, async (req, res) => {
  if (!tv4.validate(req.body, postSchema)) {
    return res.status(400).json({ error: tv4.error });
  }
  try {
    const { content } = req.body;
    const post = await Post.create({ author: req.user.id, content });
    await post.populate('author', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent posts feed
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Like a post (your existing route)
router.post('/:postId/like', authMiddleware, async (req, res) => {
  // your existing like logic here...
});

// Dislike a post (your existing route)
router.post('/:postId/dislike', authMiddleware, async (req, res) => {
  // your existing dislike logic here...
});

export default router;
