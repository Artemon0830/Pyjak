import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { newsActions } from '@/redux/features/news/news.slice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const { news, isLoading } = useAppSelector(
    state => state.newsSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(newsActions.loadsNews());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {news.map(newsItem => (
        <div key={newsItem._id}>
          <Link to={`/news/${newsItem._id}`}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.shortDescription}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;