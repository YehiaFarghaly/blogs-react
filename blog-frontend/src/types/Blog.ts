export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    isDraft: boolean;
    createdAt: string;
  }
  
  export type BlogData = Omit<Blog, '_id' | 'createdAt'>;

