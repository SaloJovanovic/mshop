'use client';
import styles from '../styles/ShopCarousel.module.scss';
import ShopCard from './ShopCard';
import shops from '../data/shops.json';

export default function ShopCarousel() {
  return (
    <div className={styles.carousel}>
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}
