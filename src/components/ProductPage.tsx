"use client";

import { useState } from "react";
import styles from "@/styles/ProductPage.module.scss";
import { ChevronLeft, MoreHorizontal, Heart, Share, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";
import SimpleCarousel from "@/components/SimpleCarousel";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors?: string[]; // HEX boje
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
  };
  counts: {
    label: string; // npr: "1 pack", "2 pack (10% off)"
    multiplier: number; // 1 ili 2
    discountedPrice: number;
  }[];
}

type Props = {
  product: Product;
};

const ProductPage: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedCount, setSelectedCount] = useState(product.counts[0]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className={styles.wrapper}>
      {/* Sticky Header */}
      <div className={styles.header}>
        <div className={styles.left}>
          <ChevronLeft size={20} />
          <img src={product.shop.logo} alt="Shop Logo" width={24} height={24} className={styles.logo} />
          <div>
            <div className={styles.shopName}>{product.shop.name}</div>
            <div className={styles.rating}>
              {product.shop.rating} ★ ({product.shop.reviews.toLocaleString()})
            </div>
          </div>
        </div>
        <MoreHorizontal size={20} />
      </div>

      {/* Carousel */}
      <SimpleCarousel images={product.images}/>

      <div className={styles.content}>
        {/* Title and Actions */}
        <div className={styles.titleRow}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.actions}>
            <Heart size={20} />
            <Share size={20} />
          </div>
        </div>

        {/* Price */}
        <div className={styles.price}>£{selectedCount.discountedPrice.toFixed(2)}</div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className={styles.colors}>
            <div className={styles.label}>Color</div>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`${styles.color} ${selectedColor === color ? styles.selected : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className={styles.quantity}>
          <div className={styles.label}>Quantity</div>
          <div className={styles.counter}>
            <button onClick={() => handleQuantityChange(-1)}><Minus size={14} /></button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}><Plus size={14} /></button>
          </div>
        </div>

        {/* Count Options */}
        <div className={styles.counts}>
          <div className={styles.label}>Count</div>
          <div className={styles.countsMap}>
            {product.counts.map((count) => (
              <button
                key={count.label}
                onClick={() => setSelectedCount(count)}
                className={`${styles.countOption} ${selectedCount.label === count.label ? styles.active : ""}`}
              >
                {count.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.buttons}>
          <button className={styles.addToCart}>Add to Cart</button>
          <button className={styles.buyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
