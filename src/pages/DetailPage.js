import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaImdb, FaPlay } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import AltAvatar from '../assets/avatar.jpg';
import AltPoster from '../assets/poster.jpg';
import tmdbApi from '../api/tmdbApi';
import useFetch from '../hooks/useFetch';
import useFetch2 from '../hooks/useFetch2';
import apiConfig from '../api/apiConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { type } = useParams();
  const [key, setKey] = useState();
  const detail = useFetch2(tmdbApi.detail(id, type));
  const credits = useFetch2(tmdbApi.credits(id, type));
  const reviews = useFetch(tmdbApi.reviews(id, type));
  const videos = useFetch(tmdbApi.videos(id, type));
  const similar = useFetch(tmdbApi.similar(id, type));
  let director;
  let time = timeConvert(detail.runtime);

  if (credits.crew) {
    director = credits.crew.find((c) => c.job === 'Director');
  }

  function timeConvert(n) {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + ' hour(s) ' + rminutes + ' minutes';
  }

  let avatar = (reviews?.slice(0, 3) || []).map((review) => {
    return {
      id: review.id,
      name: review.author,
      path: review.author_details.avatar_path,
      content: review.content,
    };
  });

  return (
    <div className="DetailPage">
      <div
        className="background1 h-[346px] md:h-[466px] lg:h-[560px] relative bg-cover bg-no-repeat	bg-center -z-20"
        style={{
          backgroundImage: `url(${apiConfig.image(detail.backdrop_path)})`,
        }}
      ></div>
      <div className="flex flex-col justify-center items-center -mt-72 lg:items-start lg:flex-row lg:px-5 2xl:px-0 2xl:mx-44">
        <div>
          {(detail.poster_path && (
            <img
              src={apiConfig.image(detail.poster_path)}
              alt="img"
              className="w-80 h-[100%] rounded mb-10"
            ></img>
          )) || (
            <img
              src={AltPoster}
              className="w-80 h-[100%] rounded mb-10"
              alt="img"
            ></img>
          )}

          <button
            type="button"
            className="inline-flex justify-center text-xl w-full mb-3 py-3 border border-transparent rounded text-white bg-red-600 hover:bg-red-700"
          >
            Watch Now
          </button>
        </div>
        <div className="right px-2 lg:w-3/4 xl:w-2/3 md:mx-10">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            {detail.title || detail.name || detail.original_title}
          </h2>
          <p className="mt-2 text-gray-400">
            {detail.tagline || detail.status}
          </p>
          {(detail.runtime && <p className=" mt-6 md:mt-16">{time}</p>) || (
            <p className=" mt-6 md:mt-16">
              {detail.number_of_episodes} Episodes/ {detail.number_of_seasons}{' '}
              Season(s)
            </p>
          )}
          <div className="flex items-center gap-2 my-4">
            <FaImdb className="text-4xl text-yellow-500 "></FaImdb>
            {Math.round(detail.vote_average * 100) / 100}
          </div>
          <div>
            {detail.genres &&
              detail.genres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  className="inline-flex justify-center text-sm py-2 sm:px-6 px-3 border rounded-full text-white hover:bg-white hover:text-red-600 mr-2 mb-10"
                >
                  {genre.name}
                </button>
              ))}
          </div>
          <dl className="mb-10">
            <dt className="float-left  w-[140px] text-gray-500">DIRECTOR</dt>
            {(director && <dd>{director.name}</dd>) || <dd>Unknown</dd>}
            <dt className="float-left  w-[140px] text-gray-500">LANGUAGE</dt>
            {(detail.spoken_languages && detail.spoken_languages.length > 0 && (
              <dd>{detail.spoken_languages[0].english_name}</dd>
            )) || <dd>Unknown</dd>}
            <dt className="float-left  w-[140px] text-gray-500">
              RELEASE DATE
            </dt>
            <dd>{detail.release_date || detail.first_air_date} </dd>
          </dl>
          <p className="text-base">{detail.overview}</p>
          <Cast></Cast>
          <Reviews></Reviews>
          <Trailer></Trailer>
        </div>
      </div>
      {key && (
        <div
          className="trailerbg fixed z-50 top-0 w-full h-full flex justify-center items-center"
          onClick={() => {
            setKey(false);
          }}
        >
          <iframe
            className="w-[90%] h-[35%] xl:w-[1000px] xl:h-[564px]"
            src={apiConfig.trailerUrl(key)}
            title="Youtube Video"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
          ></iframe>
          <AiOutlineClose
            className="absolute top-[5%] right-[3%] cursor-pointer md:text-4xl text-2xl"
            onClick={() => {
              setKey(false);
            }}
          />
        </div>
      )}
      <Similar></Similar>
    </div>
  );

  function Trailer() {
    return (
      <div className="trailers mt-10">
        <h2 className="text-2xl font-semibold">Videos</h2>
        {videos.length > 0 && (
          <div className="flex gap-4 justify-start ">
            {videos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="mt-4 relative hover:outline outline-2 cursor-pointer trailerImg"
                onClick={() => setKey(video.key)}
              >
                <img
                  src={apiConfig.trailerImg(video.key)}
                  alt="video"
                  className="w-[250px] "
                ></img>
                <button className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 text-4xl">
                  <FaPlay />
                </button>
              </div>
            ))}
          </div>
        )}
        {videos.length === 0 && (
          <p className="text-xl text-gray-500">
            There is no information about this!!
          </p>
        )}
      </div>
    );
  }

  function Reviews() {
    return (
      <div className="reviews mt-10">
        <h2 className="text-2xl mb-3 font-semibold">Reviews</h2>
        {avatar.length > 0 &&
          avatar.map((element) => (
            <div className="flex items-center mt-5" key={element.id}>
              {element.path && element.path.length > 40 && (
                <img
                  src={element.path.slice(1, element.path.length)}
                  alt="img"
                  className="rounded-full "
                ></img>
              )}
              {element.path && element.path.length < 40 && (
                <img
                  src={apiConfig.image(element.path)}
                  alt="img"
                  className="rounded-full w-[80px] h-[80px] object-cover"
                ></img>
              )}
              {!element.path && (
                <img
                  src={AltAvatar}
                  className="bg-white rounded-full w-[80px] h-[80px] object-cover"
                  alt="img"
                ></img>
              )}
              <div className="px-4">
                <p>{element.name}</p>
                <p className="line-clamp-2 text-gray-500 md:text-base text-xs max-w-[250px] md:max-w-none">
                  {element.content}
                </p>
              </div>
            </div>
          ))}
        {avatar.length === 0 && (
          <p className="text-xl text-gray-500">
            There is no information about this!!
          </p>
        )}
      </div>
    );
  }

  function Cast() {
    return (
      <div className="cast my-10">
        <h2 className="text-2xl mb-3 font-semibold">Cast</h2>
        <div className="flex gap-2 lg:gap-5 justify-start">
          {credits.cast &&
            credits.cast.slice(0, 5).map((cast) => (
              <div className="w-1/5 md:block hidden " key={cast.id}>
                {(cast.profile_path && (
                  <img
                    src={apiConfig.image(cast.profile_path)}
                    className="rounded object-cover h-5/6"
                    alt="img"
                  ></img>
                )) || (
                  <img
                    src={AltAvatar}
                    className="rounded object-cover h-5/6"
                    alt="img"
                  ></img>
                )}
                <div className="my-2">
                  <p className="text-xs md:text-base">{cast.name}</p>
                  <p className="text-gray-500 text-xs md:text-base">
                    {cast.character}
                  </p>
                </div>
              </div>
            ))}
          {credits.cast &&
            credits.cast.slice(0, 3).map((cast) => (
              <div className="md:hidden w-1/3" key={cast.id}>
                {(cast.profile_path && (
                  <img
                    src={apiConfig.image(cast.profile_path)}
                    className="rounded object-cover"
                    alt="img"
                  ></img>
                )) || (
                  <img
                    src={AltAvatar}
                    className="rounded object-cover"
                    alt="img"
                  ></img>
                )}
                <p className="text-xs">{cast.name}</p>
                <p className="text-gray-500 text-xs">{cast.character}</p>
              </div>
            ))}
        </div>
        {credits.cast && credits.cast.length === 0 && (
          <p className="text-xl text-gray-500 ">
            There is no information about this!!
          </p>
        )}
      </div>
    );
  }

  function Similar() {
    return (
      <div className="2xl:mx-44 md:mx-6 mt-10 px-2">
        <h2 className="font-semibold text-2xl">Similar</h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper md:block hidden mt-4"
        >
          {similar &&
            similar.map((film) => (
              <SwiperSlide className="cursor-pointer" key={film.id}>
                {(film.poster_path && (
                  <img
                    src={apiConfig.image(film.poster_path)}
                    alt="img"
                    onClick={() => navigate(`/${type}/${film.id}`)}
                    className="rounded"
                  ></img>
                )) || (
                  <img
                    src={AltPoster}
                    alt="img"
                    onClick={() => navigate(`/${type}/${film.id}`)}
                    className="rounded"
                  ></img>
                )}
                <p className="truncate text-lg">{film.title || film.name}</p>
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper md:hidden block mt-4"
        >
          {similar &&
            similar.map((film) => (
              <SwiperSlide className="cursor-pointer" key={film.id}>
                {(film.poster_path && (
                  <img
                    src={apiConfig.image(film.poster_path)}
                    alt="img"
                    onClick={() => navigate(`/${type}/${film.id}`)}
                    className="rounded"
                  ></img>
                )) || (
                  <img
                    src={AltPoster}
                    alt="img"
                    onClick={() => navigate(`/${type}/${film.id}`)}
                    className="rounded"
                  ></img>
                )}
                <p className="truncate">{film.title || film.name}</p>
              </SwiperSlide>
            ))}
        </Swiper>
        {similar.length === 0 && (
          <p className="text-xl text-gray-500 ">
            There is no information about this!!
          </p>
        )}
      </div>
    );
  }
};

export default DetailPage;
