import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { newsActions } from "@/redux/features/news/news.slice";

const NewPage = () => {
  const { newsId } = useParams();

  const dispatch = useAppDispatch();

  const { oneNews } = useAppSelector(
    state => state.newsSlice
  );

  useEffect(() => {
    if (newsId) {
      dispatch(newsActions.loadNews(newsId));
    }
  }, [dispatch, newsId]);

  if (!oneNews) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{oneNews.title}</h1>

      <p>{oneNews.content}</p>

      <p>{oneNews.shortDescription}</p>

      {oneNews.newsImage && (
        <img
          src={`${import.meta.env.VITE_MINIO_PUBLIC_URL}/photos/${oneNews.newsImage}`}
          alt={oneNews.title}
        />
      )}
     


      <p>
        <Link to={`/places/${oneNews.placeId}`}>
          Перейти на сторінку закладу
        </Link>
      </p>

      <p>
        <Link to={`/users/${oneNews.author}`}>
          Перейти на сторінку автора
        </Link>
      </p>
    </div>
  );
};

export default NewPage;