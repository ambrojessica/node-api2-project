// implement your posts router here
const e = require('express');
const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const Post = require('./posts-model');

//get
router.get('/', async (req, res) => {
  Post.find();
  try {
    const post = await Post.find();
    res.json(post);
  }
  catch {
    res.status(500).json({
      message: 'The posts information could not be retrieved',
      err: err.message,
      stack: err.stack,
    });
  }
});

//get id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'The post information could not be retrieved'
      });
    });
});

// //post
router.post('/', async (req, res) => {
  const { title, contents } = req.body;

  try {
    if (!title || !contents) {
      res.status(400).json({
        message: 'Please provide title and contents for the post'
      });
    } else {
      const dataPost = await Post.insert({ title, contents });
      const createPost = await Post.findById(dataPost.id);
      res.status(201).json(createPost);
    }
  }
  catch {
    res.status(500).json({
      message: 'There was an error while saving the post to the database'
    });
  }
});

// //put
router.put('/:id', async (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  const editedPost = await Post.findById(id);

  try {
    if (!editedPost) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else if (!title || !contents) {
      res.status(400).json({
        message: 'Please provide title and contents for the post'
      });
    } else {
      await Post.update(id, { title, contents });
      const updatedPost = await Post.findById(id);
      res.status(200).json(updatedPost);
    }
  }
  catch {
    res.status(500).json({
      message: 'The post information could not be modified'
    });
  }
});

// //delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findById(id);
    if (!deletedPost) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else {
      res.json(deletedPost);
      await Post.remove(id);
    }
  }
  catch {
    res.status(500).json({
      message: 'The post could not be removed'
    });
  }
});


// //get comments
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Post.findById(id);
    if (!comment) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    } else {
      const status = await Post.findPostComments(id);
      res.json(status);
    }
  }
  catch {
    res.status(500).json({
      message: 'The comments information could not be retrieved'
    });
  }
});

module.exports = router;


