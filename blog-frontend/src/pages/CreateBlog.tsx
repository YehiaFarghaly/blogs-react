import React, { useState } from 'react';
import Swal from 'sweetalert2';
import BlogForm from '../components/BlogForm';
import { Container } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { createBlog } from '../features/blogSlice';
import { BlogData } from '../types/Blog';

const CreateBlog: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BlogData) => {
    setLoading(true);
    console.log('Submitting data:', data);
    try {
      await dispatch(createBlog(data)).unwrap();
      console.log('Blog created successfully');
      Swal.fire({
        title: 'Success',
        text: 'Blog created successfully!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to create blog.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: '2%', mb: '2%' }}>
      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </Container>
  );
};

export default CreateBlog;
