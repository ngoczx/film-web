import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AltPoster from '../assets/poster.jpg';
import apiConfig from '../api/apiConfig';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FilmsList = ({ film, type }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="container w-1/2 md:w-1/3 lg:w-1/4 px-2 py-5 ">
      {!loaded && (
        <div className="h-[270px] md:h-[370px] 2xl:h-[500px]">
          <Skeleton highlightColor="#b5b5b5" height="100%" width="100%" />
        </div>
      )}

      {(film.poster_path && (
        <img
          className="rounded shadow-2xl cursor-pointer"
          style={loaded ? {} : { display: 'none' }}
          src={apiConfig.image(film.poster_path)}
          alt="img"
          onLoad={() => setLoaded(true)}
          onClick={() => {
            navigate(`/${type}/${film.id}`);
          }}
        ></img>
      )) || (
        <img
          src={AltPoster}
          alt="img"
          style={loaded ? {} : { display: 'none' }}
          className="rounded cursor-pointer"
          onLoad={() => setLoaded(true)}
          onClick={() => {
            navigate(`/${type}/${film.id}`);
          }}
        ></img>
      )}
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/${type}/${film.id}`);
        }}
      >
        <h2 className="md:text-xl pt-2 truncate">{film.title || film.name}</h2>
        <p className="text-gray-500">
          {film.release_date || film.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default FilmsList;
