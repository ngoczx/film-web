import React, { Fragment, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/loading';

const HomePage = lazy(() => import('./pages/HomePage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Fragment>
  );
};

export default App;
