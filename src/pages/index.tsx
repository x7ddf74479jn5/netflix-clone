import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { Banner } from 'src/components/Banner';
import { getMovies } from 'src/lib/getMovies';
import { Category, Movie } from 'src/models';

import { Nav } from '../components/Nav';
import { Row } from '../components/Row';
import { requests } from '../models/request';
import styles from '../styles/App.module.scss';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
type StaticProps = { categories: Category };

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const promises = Object.entries(requests).map(async ([key, fetchUrl]) => {
    const request = await getMovies(fetchUrl);
    const movies: Movie[] = request.data.results;
    return [key, movies];
  });
  const categories = await Promise.all(promises).then((values) => {
    return Object.fromEntries(values);
  });

  return {
    props: { categories },
    revalidate: 60 * 60,
  };
};

const Home: NextPage<PageProps> = ({ categories }) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Netflix Clone</title>
        <meta name='description' content='Netflix Clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <Banner movies={categories.netflixOriginals} />
      <Row title='NETFLIX ORIGINALS' movies={categories.netflixOriginals} isLargeRow />
      <Row title='Top Rated' movies={categories.topRated} />
      <Row title='Trend' movies={categories.trending} />
      <Row title='Action Movies' movies={categories.actionMovies} />
      <Row title='Horror Movies' movies={categories.horrorMovies} />
      <Row title='Comedy Movies' movies={categories.comedyMovies} />
      <Row title='Romance Movies' movies={categories.romanceMovies} />
      <Row title='Documentaries' movies={categories.documentMovies} />
    </div>
  );
};

export default Home;
