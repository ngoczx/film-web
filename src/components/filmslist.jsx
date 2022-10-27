import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import AltPoster from '../assets/poster.jpg';
import apiConfig from '../api/apiConfig';

const FilmsList = ({ film, type }) => {
  const navigate = useNavigate();

  return (
    <div
      className="container w-1/2 md:w-1/3 lg:w-1/4 px-2 py-5 cursor-pointer"
      onClick={() => {
        navigate(`/${type}/${film.id}`);
      }}
    >
      {(film.poster_path && (
        <img
          className="rounded shadow-2xl"
          src={apiConfig.image(film.poster_path)}
          alt="img"
        ></img>
      )) || <img src={AltPoster} alt="img" className="rounded"></img>}

      <h2 className="md:text-xl pt-2 truncate">{film.title || film.name}</h2>
      <p className="text-gray-500">
        {film.release_date || film.first_air_date}
      </p>
    </div>
  );
};

export default FilmsList;
