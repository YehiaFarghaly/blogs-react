import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlogCard from './BlogCard';
import { Blog } from '../types/Blog';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; 

interface DraggableCardProps {
    blog: Blog;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ blog }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: blog._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'default',
    };

    return (
        <div ref={setNodeRef} style={{ ...style, position: 'relative' }} {...attributes}>
            <div
                {...listeners}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    cursor: 'grab',
                    zIndex: 1, 
                }}
            >
                <DragIndicatorIcon fontSize="small" />
            </div>
            <BlogCard blog={blog} />
        </div>
    );
};

export default DraggableCard;
