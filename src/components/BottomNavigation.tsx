'use client';
import styles from '../styles/BottomNavigation.module.scss';
import { FiHome, FiSearch, FiList, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  // Provera da li je ruta /store/{storeId}
  const isStorePage = /^\/store\/\d+/.test(pathname);

  return (
    <nav className={styles.nav}>
      {isStorePage && (
        <motion.div
        initial={{opacity: 1, x: 100}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 1, x: 100}}
        transition={{
          opacity: {duration: 0.5},
          y: {type: 'spring', stiffness: 60, damping: 15},
        }}
        className={styles.backButtonWrapper}>
          {/* Ovde renderuj svoju komponentu */}
          <Link className={styles.button + ' ' + styles.backButton} href={'/'}>
            <FiArrowLeft />
          </Link>
          {/* Primer: <MyCustomComponent /> */}
        </motion.div>
      )}
      <div className={styles.innerNav}>
        {pathname === '/store' && searchParams.get('shopId') ? (
          <Link
            prefetch={false}
            href={`/store/${searchParams.get('shopId')}`}
            className={`${styles.button} ${activePath === `/store/${searchParams.get('shopId')}` ? styles.selected : ''}`}
          >
            TEST
          </Link>
        ) : <></>}
        <Link
          prefetch={false}
          href="/"
          className={`${styles.button} ${activePath === '/' ? styles.selected : ''}`}
        >
          <FiHome />
        </Link>
        <Link
          prefetch={false}
          href="/search"
          className={`${styles.button} ${activePath === '/search' ? styles.selected : ''}`}
        >
          <FiSearch />
        </Link>
        <Link
          prefetch={false}
          href="/orders"
          className={`${styles.button} ${activePath === '/orders' ? styles.selected : ''}`}
        >
          <FiList />
        </Link>
      </div>
      {isStorePage && (
        <div className={styles.backButtonWrapper2 + ' ' + styles.backButtonWrapper}>
          {/* Ovde renderuj svoju komponentu */}
          <button className={styles.button + ' ' + styles.backButton}>
            <FiArrowLeft />
          </button>
          {/* Primer: <MyCustomComponent /> */}
        </div>
      )}
    </nav>
  );
}
