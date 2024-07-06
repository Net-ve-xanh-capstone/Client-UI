import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const path = ['/blog/card-blog', '/blog/type-blog', '/blog/type-blog', '/blog'];

  useEffect(() => {
    if (path.includes(pathname)) {
      return;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
