import { React } from 'react';
import Header from '../components/header';
import Movies from '../components/movies';
import Series from '../components/series';
import tmdbApi from '../api/tmdbApi';
import useFetch from '../hooks/useFetch';

function HomePage() {
  const trending = useFetch(tmdbApi.trending);
  const movies = useFetch(tmdbApi.movie);
  const series = useFetch(tmdbApi.tv);

  return (
    <div className="HomePage">
      <Header trending={trending} />
      <Movies movies={movies} />
      <Series series={series} />
    </div>
  );
}

export default HomePage;
