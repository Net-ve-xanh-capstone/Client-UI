import { BlogCtx } from './blog.provider.jsx';
import { useContext } from 'react';

export const useBlogProvider = () => {
  const ctx = useContext(BlogCtx);
  if (!ctx) {
    throw new Error('Need provider');
  }
  return ctx;
};