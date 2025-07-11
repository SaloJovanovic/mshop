import BottomNavigation from "@/components/BottomNavigation";
import ShopCarousel from "@/components/ShopCarousel";
import StorePreview from "@/components/StorePreview";
import BackgroundVideoComponent from "@/components/BackgroundVideoComponent";
import BackgroundVideoComponentV2 from "@/components/BackgroundVideoComponentV2";
import BackgroundVideoComponentV3 from "@/components/BackgroundVideoComponentV3";
import shops from '../data/shops.json';
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main style={{padding: '0 1.2rem 1.2rem 1.2rem'}}>
        <h2 style={{padding: '0 1rem 1rem 1rem'}}>Recommended Shops</h2>
        <ShopCarousel/>
        <StorePreview
          shop={shops[2]}
        />
        <BackgroundVideoComponent shop={shops[1]}/>
        <BackgroundVideoComponentV2 shop={shops[0]}/>
        <BackgroundVideoComponentV3 shop={shops[4]}/>
        <br/>
        <br/>
        <br/>
        <BottomNavigation/>
      </main>
    </div>
  );
}