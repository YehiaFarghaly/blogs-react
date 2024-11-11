import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchBlogById } from '../features/blogSlice';
import { Blog } from '../types/Blog';
import parse from 'html-react-parser';
import { Box, Typography, Container, CircularProgress, Divider } from '@mui/material';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state) => state.blog.blogs.find((b: Blog) => b._id === id));

  useEffect(() => {
    if (id) dispatch(fetchBlogById(id));
  }, [id, dispatch]);

  if (!blog) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FBFBFB, #d3d3d3)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="text.primary"
          fontWeight="600"
          sx={{ fontFamily: 'Roboto, sans-serif', color: '#4C4B16', mb: 2 }}
        >
          {blog.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic', mb: 4 }}
        >
          By {blog.author}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            typography: 'body1',
            color: 'text.primary',
            lineHeight: 1.75,
            '& img': {
              maxWidth: '100%',  
              height: '300px',   
              borderRadius: 2,    
              boxShadow: 1,      
            },
          }}
        >
          {parse(blog.content)}
        </Box>

      </Box>
    </Container>
  );
};

export default BlogDetail;
