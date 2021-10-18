const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');


// @route   POST api/posts
// @desc    Create a post
// @access  public
router.post('/', [auth, [
   check('text', 'Text is required').not().isEmpty(),
]], async ( req, res ) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post(
         {
            text: req.body.text.trim(),
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
         });

      const post = await newPost.save();
      res.json(post);

   } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
   }
});


// @route   GET api/posts
// @desc    Get all posts
// @access  private
router.get('/', auth, async ( req, res ) => {
   try {
      // TODO - sort post according to created time and date
      const posts = await Post.find().sort({ _id: -1 }); // sort descending order
      res.json(posts);
   } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
   }
});

// @route   GET api/posts/:id
// @desc    Get a single post by post id
// @access  private
router.get('/:id', auth, async ( req, res ) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' });
      }

      res.json(post);

   } catch (err) {
      console.error(err.message);

      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      return res.status(500).send('Server Error');
   }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post by id
// @access  private

router.delete('/:id', auth, async ( req, res ) => {
   try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');

      //check post
      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' });
      }

      // Check user
      if (post.user.toString() !== user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      await post.remove();

      res.json({ msg: 'Post deleted' });

   } catch (err) {
      console.error(err.message);

      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      return res.status(500).send('Server Error');
   }
});

// @route   PUT api/posts/like/id
// @desc    Like a post
// @access  private

router.put('/like/:id', auth, async ( req, res ) => {
   try {
      const post = await Post.findById(req.params.id);

      // check post
      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' });
      }

      // check if current user has already liked the post
      const isLiked = post.likes.some(like => like.user.toString() === req.user.id);
      if (isLiked) {
         return res.status(400).json({ msg: 'Post already liked!' });
      }

      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);

   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      return res.status(500).send('Server Error');
   }
});


// @route   PUT api/posts/unlike/id
// @desc    Unlike a post
// @access  private

router.put('/unlike/:id', auth, async ( req, res ) => {
   try {
      const post = await Post.findById(req.params.id);

      // check post
      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' });
      }

      // check if current user has already liked the post
      const isLiked = post.likes.some(like => like.user.toString() === req.user.id);
      if (!isLiked) {
         return res.status(400).json({ msg: 'Post not yet liked!' });
      }

      // remove the user from likes array
      post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);

      await post.save();
      res.json(post.likes);

   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      return res.status(500).send('Server Error');
   }
});


// @route   POST api/posts/comment/:post_id
// @desc    Create a comment
// @access  Private
router.post('/comment/:post_id', [auth, [
   check('text', 'Text is required').not().isEmpty(),
]], async ( req, res ) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   try {
      const post = await Post.findById(req.params.post_id);
      const user = await User.findById(req.user.id).select('-password');
      const newComment = {
         text: req.body.text.trim(),
         user: req.user.id,
         name: user.name,
         avatar: user.avatar
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);

   } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
   }
});

// @route   Delete api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  Private

router.delete('/comment/:post_id/:comment_id', auth, async ( req, res ) => {
   try {

      const post = await Post.findById(req.params.post_id);

      // Pull out the comment from the comments array
      const comment = post.comments.find(comment => comment.id.toString() === req.params.comment_id);

      // check comment
      if (!comment) {
         return res.status(404).json({ msg: 'comment not found' });
      }

      // check user
      if (comment.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized!' });
      }

      //delete comment from comments array
      post.comments = post.comments.filter(postComment => postComment.id.toString() !== comment.id);

      await post.save();

      res.json({ msg: 'comment deleted' });

   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'User not authorized!' });
      }
      return res.status(500).send('Server Error');
   }
});


module.exports = router;
















