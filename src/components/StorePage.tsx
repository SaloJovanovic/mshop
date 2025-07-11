'use client';
import styles from '@/styles/StorePage.module.scss';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import ShopOptionsModal from '@/components/ShopOptionsModal';
import ColorThief from 'color-thief-browser';
import { FiBell, FiSearch } from "react-icons/fi";

interface Product {
  image: string;
  name: string;
  price: string;
}

interface Props {
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    backgroundImage?: string;
    backgroundVideo?: string;
    specialOffer?: string;
    products: Product[];
  };
}

export default function StorePage({ shop }: Props) {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [bgColor, setBgColor] = useState<string>('white');
  const [textColor, setTextColor] = useState<string>('black');
  const [showModal, setShowModal] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);

  // Funkcija za određivanje kontrastne boje
  const getContrastColor = useCallback((r: number, g: number, b: number) => {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
  }, []);

  // Funkcija za ekstrakciju dominantne boje iz ImageData
  const extractDominantColorFromImageData = useCallback((imageData: ImageData) => {
    const colorThief = new ColorThief();
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return [0, 0, 0];

    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.putImageData(imageData, 0, 0);

    const color = colorThief.getColor(tempCanvas);
    return color;
  }, []);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    // Funkcija za obradu boje (zajednička za sliku i video)
    const processColor = (r: number, g: number, b: number) => {
      setBgColor(`rgb(${r}, ${g}, ${b})`);
      setTextColor(getContrastColor(r, g, b));
    };

    // --- LOGIKA ZA SLIKE ---
    const handleImageColor = () => {
      if (mediaElement instanceof HTMLImageElement && mediaElement.complete) {
        try {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(mediaElement);
          processColor(color[0], color[1], color[2]);
        } catch (error) {
          console.error('Error getting color from image:', error);
          setBgColor('white');
          setTextColor('black');
        }
      }
    };

    // --- LOGIKA ZA VIDEO (jednokratna) ---
    const handleVideoLoadedData = () => {
      if (mediaElement instanceof HTMLVideoElement) {
        if (!canvas) {
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d', { willReadFrequently: true });
        }

        if (ctx && mediaElement.videoWidth && mediaElement.videoHeight) {
          // Smanjujemo rezoluciju canvasa radi performansi
          const scaleFactor = 100 / mediaElement.videoWidth; // Smanjujemo širinu na 100px
          canvas.width = 100;
          canvas.height = mediaElement.videoHeight * scaleFactor;

          // Crta prvi frejm na canvas
          ctx.drawImage(mediaElement, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const color = extractDominantColorFromImageData(imageData);
          processColor(color[0], color[1], color[2]);
        }
      }
    };

    if (mediaElement) {
      if (shop.backgroundVideo) {
        // Dodajemo event listener za 'loadeddata'
        mediaElement.addEventListener('loadeddata', handleVideoLoadedData);
        // Ako je video već učitan (npr. iz keša), odmah pozovi funkciju
        if ("readyState" in mediaElement && mediaElement.readyState >= 2) {
          handleVideoLoadedData();
        }
      } else if (shop.backgroundImage) {
        if (mediaElement instanceof HTMLImageElement) {
          if (mediaElement.complete) {
            handleImageColor();
          } else {
            mediaElement.addEventListener('load', handleImageColor);
          }
        }
      }
    }

    // Cleanup funkcija
    return () => {
      if (mediaElement) {
        if (shop.backgroundVideo) {
          mediaElement.removeEventListener('loadeddata', handleVideoLoadedData);
        } else if (shop.backgroundImage) {
          if (mediaElement instanceof HTMLImageElement) {
            mediaElement.removeEventListener('load', handleImageColor);
          }
        }
      }
    };
  }, [shop.backgroundVideo, shop.backgroundImage, getContrastColor, extractDominantColorFromImageData]);

  useEffect(() => {
    const onScroll = () => {
      setShowSpecial(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{
        background: bgColor,
        color: textColor,
        '--bg-color': bgColor,
        '--text-color': textColor,
      } as React.CSSProperties}
    >
      {shop.backgroundVideo ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={shop.backgroundVideo}
          className={styles.media}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={shop.backgroundImage}
          className={styles.media}
          alt="background"
          crossOrigin="anonymous"
        />
      )}

      <div className={`${styles.specialOffer} ${showSpecial ? styles.visible : ''}`}>
        {shop.specialOffer}
      </div>

      <div className={styles.overlay}>
          <img src={shop.logo} alt="logo"/>
      </div>

      <div className={styles.shopDetails}>
        <div className={styles.shopMeta}>
          <div>
            <h1>{shop.name}</h1>
            <p>{shop.rating.toFixed(1)} ★ ({shop.reviews.toLocaleString()})</p>
          </div>
          <div className={styles.actions}>
            <button><i className="icon-bell"/><FiBell/></button>
            <button><i className="icon-search"/><FiSearch/></button>
            <button onClick={() => setShowModal(true)}><FiMoreHorizontal/></button>
          </div>
        </div>
      </div>

      <ShopOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={shop}/>
    </div>
  );
}