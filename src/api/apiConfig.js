const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '80bac4ebebeb23003766f89fd049dcab',
  image: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  trailerUrl: (urlKey) => `https://www.youtube.com/embed/${urlKey}?autoplay=1`,
  trailerImg: (img) => `https://img.youtube.com/vi/${img}/mqdefault.jpg`,
};

export default apiConfig;
