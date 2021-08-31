import React, { VFC } from 'react';
import { Movie } from 'src/models';
import styles from 'src/styles/components/Banner.module.scss';

type Props = {
  movies: Movie[];
};

export const Banner: VFC<Props> = ({ movies }) => {
  const movie = movies[Math.floor(Math.random() * movies.length - 1)];

  function truncate(str: any, n: number) {
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + '...' : str;
    }
  }

  return (
    <header
      className={styles.Banner}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className={styles.BannerContents}>
        <h1 className={styles.BannerTitle}>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className={styles.BannerButtons}>
          <button className={styles.BannerButton}>Play</button>
          <button className={styles.BannerButton}>My List</button>
        </div>

        <h1 className={styles.BannerDescription}>{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className={styles.BannerFadeBottom} />
    </header>
  );
};
