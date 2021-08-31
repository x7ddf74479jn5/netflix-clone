import Image from 'next/image';
import React, { useEffect, useState, VFC } from 'react';
import styles from 'src/styles/components/Nav.module.scss';

export const Nav: VFC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleShow);
    return () => {
      window.removeEventListener('scroll', handleShow);
    };
  }, []);
  return (
    <div className={`${styles.Nav} ${show && styles.NavBlack}`}>
      <div className={styles.NavLogo}>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'
          alt='Netflix Logo'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className={styles.NavAvatar}>
        <Image
          src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
          alt='Avatar'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  );
};
