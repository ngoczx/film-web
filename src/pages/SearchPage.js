import { React, useEffect, useState } from 'react';
import FilmsList from '../components/filmslist';
import useDebounce from '../hooks/useDebounce';
import tmdbApi from '../api/tmdbApi';
import useFetch from '../hooks/useFetch';
import apiConfig from '../api/apiConfig';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const { type } = useParams();
  const [page, setPage] = useState(2);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [temp, setTemp] = useState([]);
  const [results, setResults] = useState(false);
  const [addList, setAddList] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);
  const trending = useFetch(tmdbApi.trending);
  const filmlist = useFetch(tmdbApi.type(type));

  useEffect(() => {
    if (debouncedSearch) {
      getList(debouncedSearch);
    }
  }, [debouncedSearch]);

  const getList = async (query) => {
    await fetch(
      `${apiConfig.baseUrl}search/multi?api_key=${apiConfig.apiKey}&query=${query}&page=1`
    ) //
      .then((res) => res.json())
      .then((res) => setList(res.results));
    setResults(true);
  };

  useEffect(() => {
    setTemp(list.filter((element) => element.media_type === type));
  }, [list, type]);

  useEffect(() => {
    if (type) {
      fetch(
        `${apiConfig.baseUrl}${type}/popular?api_key=${apiConfig.apiKey}&page=${page}`
      )
        .then((res) => res.json())
        .then((res) => setAddList(res.results));
      if (addList && filmlist) {
        addList.every((element) => filmlist.push(element));
      }
    }
  }, [page, type]);

  console.log(filmlist);
  return (
    <div className="2xl:mx-60 md:mx-2 mt-8 lg:mt-16">
      <input
        type="search"
        className="rounded h-12 px-2 mx-2 text-lg outline-none text-black"
        placeholder="Search for a film..."
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {!type && (
        <div className="flex flex-wrap justify-start items-start min-h-[100vh]">
          {!results &&
            trending.map((film) => (
              <FilmsList film={film} key={film.id} type={film.media_type} />
            ))}
          {list.length > 0 &&
            list
              .slice(0, 12)
              .map((film) => (
                <FilmsList film={film} key={film.id} type={film.media_type} />
              ))}
        </div>
      )}
      {type && filmlist && (
        <div>
          <div className="flex flex-wrap justify-start items-start min-h-[100vh]">
            {!results &&
              filmlist.map((film) => (
                <FilmsList film={film} key={film.id} type={type} />
              ))}
            {temp &&
              temp.map((film) => (
                <FilmsList film={film} key={film.id} type={type} />
              ))}
          </div>
        </div>
      )}
      {list.length === 0 && results && (
        <div className="mx-2 mt-10 text-2xl h-[500px]">
          There is no information
        </div>
      )}
      <div className="flex justify-center">
        {type && (
          <button
            className="md:text-md text-sm py-1 px-7 border rounded-full text-white hover:bg-white hover:text-red-600"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
