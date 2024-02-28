import articles from './article-content';
import ArticleList from '../Components/ArticlesList';

const ArticlesListPage = () => {
  return (
    <>
      <h1>List of Articles</h1>
      <ArticleList articles={articles} />
    </>
  );
};

export default ArticlesListPage;
