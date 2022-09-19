import { React, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import 'swiper/css';

const Header = ({ trending }) => {
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getTrailer = async () => {
        const temp = await fetch(
          `${apiConfig.baseUrl}${type}/${id}/videos?api_key=${apiConfig.apiKey}`
        ) //
          .then((res) => res.json());
        setKey(temp.results.find((element) => element.type === 'Trailer').key);
      };
      getTrailer();
    }
  }, [type, id]);

  return (
    <div className="header">
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {trending.slice(0, 5).map((element) => (
            <SwiperSlide key={element.id}>
              <div className="background1 absolute -z-50 w-full">
                <img
                  className="hidden md:block w-full"
                  src={apiConfig.image(element.backdrop_path)}
                  alt="img"
                ></img>
                <img
                  className="md:hidden"
                  src={apiConfig.image(element.poster_path)}
                  alt="img"
                ></img>
              </div>
              <div className="flex items-center text-center md:text-left xl:px-20 md:gap-10 md:py-10 md:px-16 ">
                <img
                  className="xl:w-80 w-0 md:w-52 rounded-2xl shadow-2xl shadow-black"
                  src={apiConfig.image(element.poster_path)}
                  alt="img"
                ></img>
                <div className="right flex flex-col justify-center items-center md:block">
                  <h1 className="md:text-4xl text-xl  font-semibold mb-5 md:mb-10">
                    {element.title || element.name}
                  </h1>
                  <p className="text-sm justify-center px-1 lg:text-base mb-5 md:mb-10">
                    {element.overview}
                  </p>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        navigate(`/${element.media_type}/${element.id}`);
                      }}
                      type="button"
                      className="inline-flex justify-center md:text-xl text-sm py-2 px-7 border border-transparent rounded-full text-white bg-red-600 hover:bg-red-700"
                    >
                      Watch Now
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center md:text-xl text-sm py-2 px-7 border rounded-full text-white hover:bg-white hover:text-red-600 ml-7 "
                      onClick={() => {
                        setId(element.id);
                        setType(element.media_type);
                      }}
                    >
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {key && (
          <div
            className="trailerbg fixed z-50 top-0 w-full h-full flex justify-center items-center"
            onClick={() => {
              setKey(false);
            }}
          >
            <iframe
              className="w-[90%] h-[40%] xl:w-[1000px] xl:h-[564px]"
              src={apiConfig.trailerUrl(key)}
              title="Youtube Video"
              allowFullScreen
            ></iframe>
            <button className="absolute top-[5%] right-[3%] cursor-pointer text-2xl md:text-4xl">
              <AiOutlineClose
                onClick={() => {
                  setKey(false);
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
