import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getAllBlog } from '../../../api/blogApi.js';

export const BlogCtx = createContext(null);
export const BlogProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [checkBox, setCheckBox] = useState([]);
  const [filterBlog, setFilterBlog] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  // fetch data
  const fetchDataBlog = async () => {
    await getAllBlog(pageNumber)
      .then((res) => {
        const data = res.data.result;
        const categories = new Set();
        data.list.map((item) => {
          categories.add(item.categoryName);
        });
        setTotalPage(data?.totalPage);
        setCategory([...categories]); // Chuyển set sang mảng
        setBlogList(data.list);
        setFilterBlog(data.list);
        setCheckBox([]);
      })
      .catch((err) => console.log(err));
  };

  // fetch data when re-render
  useEffect(() => {
    fetchDataBlog();
  }, [pageNumber]);

  const handleCheckCategoryName = useCallback((value) => {
    console.log('run');
    const newFilter = checkBox.includes(value)
      ? checkBox.filter((item) => item !== value)
      : [...checkBox, value];

    // Kiểm tra trong BlogList có category nào trùng với category được chọn không, Nếu bỏ hết filter
    // thì set lại blogList
    if (newFilter.length === 0) {
      setFilterBlog(blogList);
      setCheckBox(newFilter);
      setTotalPage(Math.ceil(blogList.length / 5));
    } else {
      const newBlogList = blogList.filter((item) => newFilter.includes(item.categoryName));
      setCheckBox(newFilter);
      setFilterBlog(newBlogList);
      setTotalPage(Math.ceil(newBlogList.length / 5));
    }
  }, [checkBox, setCheckBox]);

  const provideProps = useMemo(() => ({
    // provide
    pageNumber,
    setPageNumber,
    blogList,
    setBlogList,
    filterBlog,
    setFilterBlog,
    category,
    setCategory,
    totalPage,
    setTotalPage,
    handleCheckCategoryName,
    checkBox,
    setCheckBox,
  }), [
    pageNumber,
    setPageNumber,
    blogList,
    setBlogList,
    filterBlog,
    setFilterBlog,
    category,
    setCategory,
    totalPage,
    setTotalPage,
    handleCheckCategoryName,
    checkBox,
    setCheckBox,
  ]);
  return (
    <BlogCtx.Provider value={provideProps}>
      {children}
    </BlogCtx.Provider>
  );
};