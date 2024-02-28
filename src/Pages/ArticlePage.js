import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../Components/CommentsList';
import AddCommentForm from '../Components/AddCommentForm';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import useUser from '../Hooks/useUser';

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  // const params = useParams();

  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const NewArticleInfo = response.data;
      setArticleInfo(NewArticleInfo);
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user, articleId]);

  const article = articles.find((articl) => articl.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticleInfo = response.data;
    setArticleInfo(updatedArticleInfo);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className='upvotes-section'>
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? 'Upvote' : 'Already Upvoted'}
          </button>
        ) : (
          <button>LogIn to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvotes</p>
      </div>

      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          OnArticleUpdate={(updatedArticleInfo) =>
            setArticleInfo(updatedArticleInfo)
          }
        />
      ) : (
        <button>LogIn to comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
