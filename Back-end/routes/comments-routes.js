import express from 'express';

const router = express.Router();

router.get('/:pid'); //Add middleware to get comments for specified project

router.post('/:pid'); //Add middleware to post new comments for specified project

router.delete('/:cid'); //Add middleware to delete specific comment

router.patch('/:cid'); //Add middleware to update specific comment

export default router;
