import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Box, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard'; 
import { fetchBlogs } from '../features/blogSlice';

const Drafts: React.FC = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog.blogs.filter((blog) => blog.isDraft));


  useEffect(()=> {
    dispatch(fetchBlogs())
  }, [dispatch])
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Draft Blogs
      </Typography>
      <Box>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </Box>
    </Box>
  );
};

export default Drafts;
