import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchBlogById, updateBlog } from '../features/blogSlice';
import { Container } from '@mui/material';
import { BlogData } from '../types/Blog';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state) => state.blog.blogs.find((b) => b._id === id));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchBlogById(id));
  }, [id, dispatch]);

  const handleSubmit = async (data: BlogData) => {
    if (!id) return;

    setLoading(true);
    try {
      await dispatch(updateBlog({ id, data })).unwrap();
      Swal.fire({
        title: 'Success',
        text: 'Blog updated successfully!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update blog.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: '2%', mb: '2%' }}>
      {blog && <BlogForm onSubmit={handleSubmit} initialData={blog} loading={loading} />}
    </Container>
  );
};

export default EditBlog;
