import React from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reorderBlogs } from '../features/blogSlice';
import './BlogList.css';
import DraggableCard from './DraggableCard';

const BlogList: React.FC = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog.blogs.filter((blog) => !blog.isDraft));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blogs.findIndex((blog) => blog._id === active.id);
      const newIndex = blogs.findIndex((blog) => blog._id === over?.id);
      const reorderedBlogs = arrayMove(blogs, oldIndex, newIndex);
      dispatch(reorderBlogs(reorderedBlogs));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={blogs.map((blog) => blog._id)} strategy={verticalListSortingStrategy}>
      {blogs.map((blog) => (
        <DraggableCard key={blog._id} blog={blog} />
      ))}
    </SortableContext>
    </DndContext>
  );
};

export default BlogList;
