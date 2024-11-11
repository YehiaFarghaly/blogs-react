import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { Blog } from '../types/Blog';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  const imageUrls = Array.from(blog.content.matchAll(/<img[^>]+src="([^">]+)"/g), match => match[1]);

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        overflow: 'hidden',
        background: 'linear-gradient(360deg, #FBFBFB, #FFFFF0)',
        mb: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      {imageUrls.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            p: 2,
            overflow: 'hidden',
          }}
        >
          {imageUrls.slice(0, 2).map((url, index) => (
            <Box
              key={index}
              component="img"
              src={url}
              alt={`Blog image ${index + 1}`}
              sx={{
                width: '50%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
      )}

      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="600"
          color="primary.main"
          sx={{ mb: 1 }}
        >
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {parse(blog.content.substring(0, 100))}...
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={(e: React.MouseEvent) =>{ 
            navigate(`/blog/${blog._id}`)}}
          sx={{
            fontWeight: 500,
            px: 2,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Read More
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/edit/${blog._id}`)}
          sx={{
            fontWeight: 500,
            px: 2,
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
            },
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
