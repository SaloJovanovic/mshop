'use client';

import styles from '../styles/ShopOptionsModal.module.scss';
import { useEffect, useState } from 'react';
import { FiX, FiHome, FiPlus, FiThumbsDown, FiAlertCircle } from 'react-icons/fi';

interface Props {
  open: boolean;
  onClose: () => void;
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
  };
}

export default function ShopOptionsModal({ open, onClose, shop }: Props) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';

      // delay za pokretanje animacije da se ne "flashne"
      requestAnimationFrame(() => {
        setAnimateIn(true);
      });
    } else {
      setAnimateIn(false);
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!animateIn) {
      setShouldRender(false);
      onClose(); // pozovi onClose TEK kada animacija zatvori
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.backdrop)) {
      setAnimateIn(false); // pokreće zatvaranje
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.backdrop} ${animateIn ? styles.backdropShow : styles.backdropHide}`}
      onClick={handleBackdropClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`${styles.modal} ${animateIn ? styles.modalShow : styles.modalHide}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={shop.logo} alt="logo" />
          </div>
          <div>
            <div className={styles.name}>{shop.name}</div>
            <div className={styles.rating}>
              {shop.rating.toFixed(1)} ★ ({shop.reviews.toLocaleString()})
            </div>
          </div>
          <button onClick={() => setAnimateIn(false)} className={styles.closeBtn}><FiX /></button>
        </div>

        <div className={styles.option}><FiHome /> Visit shop</div>
        <div className={styles.option}><FiPlus /> Follow</div>
        <div className={styles.option}><FiThumbsDown /> Not interested</div>
        {/*<div className={styles.optionDanger}><FiAlertCircle /> Report shop</div>*/}
      </div>
    </div>
  );
}
