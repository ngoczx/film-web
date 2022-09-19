import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Fragment, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Fragment>
      <Suspense fallback={<p className="text-white">Loading</p>}></Suspense>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/:type/:id" element={<DetailPage />}></Route>
        <Route path="/type/:type" element={<SearchPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
      <Footer />
      <Suspense />
    </Fragment>
  );
};

export default App;
