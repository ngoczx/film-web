import React from 'react';
import FilmsList from './filmslist';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';

const Series = ({ series }) => {
  const navigate = useNavigate();
  return (
    <div id="series" className="mt-16">
      <div className="text-white font-semibold text-4xl mx-32 text-center ">
        TV Series
      </div>
      <div className="lists relative lg:flex hidden mt-10 flex-wrap 2xl:mx-60 justify-center items-center">
        {series.slice(0, 8).map((film) => (
          <FilmsList film={film} key={film.id} type="tv" />
        ))}
      </div>
      <div className="lists relative lg:hidden flex mt-10 flex-wrap justify-center items-center">
        {series.slice(0, 6).map((film) => (
          <FilmsList film={film} key={film.id} type="tv" />
        ))}
      </div>
      <div className="flex 2xl:mx-60 justify-end px-2">
        <button
          className="text-lg flex font-light outline-none focus:outline-none items-center transform transition-all hover:scale-110 text-white"
          onClick={() => navigate(`/type/tv`)}
        >
          See more
          <AiFillCaretRight />
        </button>
      </div>
    </div>
  );
};

export default Series;
