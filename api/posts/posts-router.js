// implement your posts router here
const express = require('express');
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
// router.post('/', (req, res) => {

// })

// //put
// router.put('/:id', (req, res) => {

// })

// //delete
// router.delete('/:id', (req, res) => {

// })


// //get comments
// router.get('/:id/comments', (req, res) => {

// })

module.exports = router;


