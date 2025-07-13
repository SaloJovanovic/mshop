import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import styles from '@/styles/VideoFeedModal.module.scss';
import { FiX, FiShoppingCart, FiMoreHorizontal, FiVolume2, FiVolumeX } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
}

interface VideoItem {
  id: string;
  src: string;
  shopName: string;
  shopLogo: string;
  isFollowing: boolean;
  product: Product;
}

interface Props {
  open: boolean;
  initialIndex: number;
  videos: VideoItem[];
  onClose: () => void;
}

export default function VideoFeedModal({ open, videos, initialIndex, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to the correct video immediately when modal opens
  useLayoutEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: initialIndex * window.innerHeight,
        behavior: 'auto'
      });
      setActiveIndex(initialIndex);
    }
  }, [open, initialIndex]);

  // Update videoRefs to always match length of videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Play/Pause videos depending on activeIndex
  useEffect(() => {
    if (!open) return;

    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, open]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / window.innerHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
        {videos.map((video, index) => (
          <div key={video.id} className={styles.videoWrapper}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              muted={muted}
              loop
              playsInline
              className={styles.video}
            />

            <div className={styles.overlay}>
              <div className={styles.topLeft}>
                <p className={styles.shopName}>{video.shopName}</p>
                <button className={styles.followBtn}>
                  {video.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <div className={styles.topRight}>
                <img src={video.shopLogo} className={styles.shopLogo} alt="logo" />
                <button onClick={() => setMuted(!muted)} className={styles.soundBtn}>
                  {muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              </div>

              <div className={styles.productBox}>
                <img src={video.product.image} alt={video.product.name} />
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{video.product.name}</p>
                  <p className={styles.productMeta}>
                    {video.product.rating.toFixed(1)} ★ ({video.product.reviews}) <br />
                    {video.product.price}
                  </p>
                </div>
                <button className={styles.favBtn}>♡</button>
              </div>

              <div className={styles.bottomBar}>
                <button onClick={onClose}><FiX /></button>
                <button><FiShoppingCart /></button>
                <button><FiMoreHorizontal /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
