'use client';
import styles from '../styles/BottomNavigation.module.scss';
import { FiHome, FiSearch, FiList } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BottomNavigation() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    // Kada se promeni ruta, ažuriraj lokalni state
    setActivePath(pathname);
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
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
    </nav>
  );
}
