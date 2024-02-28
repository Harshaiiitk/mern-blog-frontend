import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ArticlePage from './Pages/ArticlePage';
import ArticlesListPage from './Pages/ArticlesListPage';
import NotFoundPage from './Pages/NotFoundPage';
import NavBar from './NavBar';
import LogInPage from './Pages/LogInPage';
import CreateAccountPage from './Pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <div id='page-body'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles/:articleId' element={<ArticlePage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/create-account' element={<CreateAccountPage />} />
            <Route path='/articles' element={<ArticlesListPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
