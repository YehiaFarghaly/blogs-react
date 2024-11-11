import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { BlogData } from '../types/Blog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogFormProps {
  onSubmit: (data: BlogData) => void;
  initialData?: Partial<BlogData>;
  loading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData, loading }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isDraft, setIsDraft] = useState(initialData?.isDraft || false);
  const [contentError, setContentError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) { 
      setContentError(true);
      return;
    }
    setContentError(false);
    onSubmit({ title, content, author, isDraft });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #FBFBFB, #d3d3d3)',
        gap: 3,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        p: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" color="primary.main" fontWeight="500" align="center" gutterBottom>
        {initialData ? 'Edit Your Blog Post' : 'Create a New Blog Post'}
      </Typography>
      
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{
          '& .MuiInputLabel-root': { color: 'primary.main' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'primary.main' },
            '&:hover fieldset': { borderColor: 'primary.dark' },
          },
        }}
      />
      
      <Typography variant="subtitle1" color="text.secondary">Content *</Typography>
      <ReactQuill
        value={content}
        onChange={(value) => {
          setContent(value);
          setContentError(!value.trim()); 
        }}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['image', 'link'],
            ['clean']
          ]
        }}
        placeholder="Write your blog content here..."
        style={{ backgroundColor: 'white', borderRadius: '4px', border: contentError ? '1px solid red' : '1px solid #ced4da' }}
      />
      {contentError && (
        <Typography color="error" variant="caption">
          Content is required.
        </Typography>
      )}

      <TextField
        label="Author"
        variant="outlined"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
        required
        sx={{
          '& .MuiInputLabel-root': { color: 'primary.main' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'primary.main' },
            '&:hover fieldset': { borderColor: 'primary.dark' },
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
            color="secondary"
          />
        }
        label="Save as Draft"
        sx={{ color: 'text.secondary' }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disabled={loading}
        sx={{
          fontWeight: '600',
          py: 1.5,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {loading ? 'Processing...' : initialData ? 'Update Blog' : 'Create Blog'}
      </Button>
    </Box>
  );
};

export default BlogForm;
