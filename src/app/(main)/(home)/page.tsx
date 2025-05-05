import { CityAndStateTheaters } from "@/components/CityAndStateTheaters";
import StageAndGalleries from "@/components/Home/StageAndGalleries";
import TheaterGroups from "@/components/Home/TheaterGroups";
import HomeBoxSlider from "@/components/HomeBoxSlider";
import TheaterSlider from "@/components/TheaterSlider";
import { ChildTheaters, TheatersByLocation, TheatersByStage } from "@/components/ThisMonthTheaterList";

export default function Home() {
  return (
    <div>
      <HomeBoxSlider />
      <TheaterSlider />

      {/* Sahne bazlı listeleme */}
      <TheatersByStage
        stageName="Baba Sahne"
      />

      {/* Lokasyon bazlı listeleme */}
      <TheatersByLocation
        locationName="Beşiktaş"
      />

      <CityAndStateTheaters />

      <section className="children-theaters bg-[#deecff] my-2">
        <ChildTheaters />
      </section>

      <StageAndGalleries />

      <TheaterGroups />

    </div>
  );
}
