import apiConfig from './apiConfig';

const tmdbApi = {
  trending: `${apiConfig.baseUrl}trending/all/day?api_key=${apiConfig.apiKey}`,
  movie: `${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}`,
  tv: `${apiConfig.baseUrl}tv/popular?api_key=${apiConfig.apiKey}`,
  detail: (id, type) =>
    `${apiConfig.baseUrl}${type}/${id}?api_key=${apiConfig.apiKey}`,
  credits: (id, type) =>
    `${apiConfig.baseUrl}${type}/${id}/credits?api_key=${apiConfig.apiKey}`,
  reviews: (id, type) =>
    `${apiConfig.baseUrl}${type}/${id}/reviews?api_key=${apiConfig.apiKey}`,
  videos: (id, type) =>
    `${apiConfig.baseUrl}${type}/${id}/videos?api_key=${apiConfig.apiKey}`,
  similar: (id, type) =>
    `${apiConfig.baseUrl}${type}/${id}/similar?api_key=${apiConfig.apiKey}`,
  type: (type) =>
    `${apiConfig.baseUrl}${type}/popular?api_key=${apiConfig.apiKey}`,
};

export default tmdbApi;
