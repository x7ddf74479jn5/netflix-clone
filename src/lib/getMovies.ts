import axios from './axios';

export async function getMovies(fetchUrl: string) {
  const request = await axios.get(fetchUrl);
  return request;
}
