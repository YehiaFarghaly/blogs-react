import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/BlogController.js';

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.get('/blogs/:id', getBlogById);
router.patch('/blogs/:id', updateBlog);


export default router;
