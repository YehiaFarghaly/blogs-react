import Blog from "../models/BlogModel.js";

export const createBlog = async (req, res) => {
    const { title, content, author, isDraft } = req.body;
    try {
        const blog = new Blog({ title, content, author, isDraft });
        await blog.save();
        console.log("blog: ", blog);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog post" });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
};


export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) res.status(200).json(blog);
        else res.status(404).json({ message: "Blog not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (blog) res.status(200).json(blog);
        else res.status(404).json({ message: "Blog not found" });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog" });
    }
};

