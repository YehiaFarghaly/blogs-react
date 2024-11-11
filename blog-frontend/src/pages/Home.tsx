import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchBlogs } from '../features/blogSlice';
import BlogList from '../components/BlogList';
import { Typography, Box, Tooltip, Container, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FBFBFB, #d3d3d3)',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between" 
          mb={6} 
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            pb: 2,
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            color="text.primary" 
            fontWeight="600"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              color: '#4C4B16',
            }}
          >
            Blog Posts
          </Typography>
          <Tooltip title="Write A New Post" arrow>
            <Fab
              color="secondary"
              onClick={() => navigate('/create')}
              sx={{
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        <BlogList />
      </Container>
    </Box>
  );
};

export default HomePage;
