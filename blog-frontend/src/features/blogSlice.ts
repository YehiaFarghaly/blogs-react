import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BlogData } from '../types/Blog';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    isDraft: boolean;
    createdAt: string;
}

interface BlogState {
    blogs: Blog[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BlogState = {
    blogs: [],
    status: 'idle',
};


export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await axios.get(`${baseUrl}/blogs`);
    console.log("resp: ", response);
    return response.data;
});

export const fetchBlogById = createAsyncThunk(`blogs/fetchSingleBlog`, async (id: string) => {
    const response = await axios.get(`${baseUrl}/blogs/${id}`);
    return response.data;
});


export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, data }: { id: string, data: BlogData }) => {
    const response = await axios.patch(`${baseUrl}/blogs/${id}`, data);
    return response.data;
});

export const createBlog = createAsyncThunk(
    'blogs/createBlog',
    async (blogData: BlogData) => {
        const response = await axios.post(`${baseUrl}/blogs`, blogData);
        return response.data;
    }
);


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        reorderBlogs(state, action: PayloadAction<Blog[]>) {
            state.blogs = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { reorderBlogs } = blogSlice.actions;
export default blogSlice.reducer;
