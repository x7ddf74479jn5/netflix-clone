import axios from 'axios';
//@ts-ignore
import movieTrailer from 'movie-trailer';
import Image from 'next/image';
import React, { useState, VFC } from 'react';
import YouTube from 'react-youtube';
import { Movie } from 'src/models';
import styles from 'src/styles/components/Row.module.scss';

const base_url = 'https://image.tmdb.org/t/p/original';

type Props = {
  title: string;
  movies: Movie[];
  isLargeRow?: boolean;
};

//trailerのoption
type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row: VFC<Props> = ({ title, movies, isLargeRow }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      let _trailerUrl = await axios.get(`/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`);
      setTrailerUrl(_trailerUrl.data.results[0]?.key);
    }
    movieTrailer(movie?.name || movie?.title || movie?.original_name || '')
      .then((url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error: any) => console.log(error.message));
  };

  return (
    <div className={styles.Row}>
      <h2>{title}</h2>
      <div className={styles.RowPosters}>
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          <div key={movie.id} className={`${styles.RowPoster} ${isLargeRow && styles.RowPosterLarge}`}>
            <Image
              key={movie.id}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
              height={isLargeRow ? 240 : 99}
              width={isLargeRow ? 160 : 176}
              layout='fixed'
            />
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
