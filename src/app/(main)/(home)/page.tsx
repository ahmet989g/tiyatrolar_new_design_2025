import { CityAndStateTheaters } from "@/components/Home/CityAndStateTheaters";
import StageAndGalleries from "@/components/Home/StageAndGalleries";
import TheaterGroups from "@/components/Home/TheaterGroups";
import HomeBoxSlider from "@/components/Home/HomeBoxSlider";
import TheaterSlider from "@/components/Home/TheaterSlider";
import { ChildTheaters, TheatersByLocation, TheatersByStage } from "@/components/Home/ThisMonthTheaterList";
import LazyLoadComponent from "@/components/LazyLoadComponent";

export default function Home() {
  return (
    <div>
      <HomeBoxSlider />

      {/* Biletler için tiyatrolar.com.tr */}
      <TheaterSlider />

      {/* Baba Sahne'de Bu Ay */}
      <LazyLoadComponent>
        <TheatersByStage
          stageName="Baba Sahne"
        />
      </LazyLoadComponent>

      {/* Beşiktaş'ta Bu Ay */}
      <LazyLoadComponent>
        <TheatersByLocation
          locationName="Beşiktaş"
        />
      </LazyLoadComponent>

      {/* Şehir Tiyatrolarında Bu Ay & Devlet Tiyatrolarında Bu Ay */}
      <LazyLoadComponent>
        <CityAndStateTheaters />
      </LazyLoadComponent>

      {/* Çocuk Tiyatrolarında Bu Ay */}
      <LazyLoadComponent>
        <section className="children-theaters bg-[#deecff] my-2">
          <ChildTheaters />
        </section>
      </LazyLoadComponent>

      {/* Popüler Sahneler ve Galeriler */}
      <LazyLoadComponent>
        <StageAndGalleries />
      </LazyLoadComponent>

      {/* Popüler Tiyatro Toplulukları */}
      <LazyLoadComponent>
        <TheaterGroups />
      </LazyLoadComponent>
    </div>
  );
}
