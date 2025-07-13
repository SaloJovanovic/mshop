import ProductPage from "@/components/ProductPage";

const fakeProduct = {
  id: "1",
  name: "SWU Token Storage Organiser",
  price: 15.60,
  images: [
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/Empty-Blue_-_Copy.jpg?v=1752223420&width=800",
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/Caddy-Bits-Box.jpg?v=1752225202&width=800",
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/MattShot-Caddy.jpg?v=1752225202&width=800"
  ],
  colors: ["#0057FF", "#FF0000", "#00B140", "#999999", "#FFD700", "#FFFFFF"],
  shop: {
    name: "BuyTheSameToken",
    logo: "/images/logos/logo5.png",
    rating: 4.9,
    reviews: 1700
  },
  counts: [
    {
      label: "1 pack",
      multiplier: 1,
      discountedPrice: 15.60
    },
    {
      label: "2 pack (10% off)",
      multiplier: 2,
      discountedPrice: 28.00
    },
    {
      label: "3 pack (15% off)",
      multiplier: 3,
      discountedPrice: 39.80
    }
  ]
};

export default function TestProductPage() {
  return <ProductPage product={fakeProduct} />;
}
