export const requests = {
  trending: `/trending/all/week?api_key=${process.env.API_KEY}&language=en-us`,
  netflixOriginals: `/discover/tv?api_key=${process.env.API_KEY}&with_networks=213`,
  topRated: `/discover/tv?api_key=${process.env.API_KEY}&languager=en-us`,
  actionMovies: `/discover/tv?api_key=${process.env.API_KEY}&with_genres=28`,
  comedyMovies: `/discover/tv?api_key=${process.env.API_KEY}&with_genres=35`,
  horrorMovies: `/discover/tv?api_key=${process.env.API_KEY}&with_genres=27`,
  romanceMovies: `/discover/tv?api_key=${process.env.API_KEY}&with_genres=10749`,
  documentMovies: `/discover/tv?api_key=${process.env.API_KEY}&with_genres=99`,
};

export type RequestKey = keyof typeof requests;
