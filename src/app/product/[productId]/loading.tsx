// app/product/[productId]/loading.tsx
import styles from '@/styles/LoadingOverlay.module.scss'; // Kreiraćemo ovaj SCSS

export default function ProductLoading() {
  return (
    <div className={styles.loadingOverlay}>
      {/* Možete staviti spinner, skeleton, ili bilo šta */}
      <div className={styles.spinner}></div>
      <p>Loading product details...</p>
    </div>
  );
}