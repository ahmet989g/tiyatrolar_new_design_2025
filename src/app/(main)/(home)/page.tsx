import HomeBoxSlider from "@/components/HomeBoxSlider";
import TheaterSlider from "@/components/TheaterSlider";
import { TheatersByLocation, TheatersByStage } from "@/components/ThisMonthTheaterList";

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
      <p className="text-black">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, ipsa mollitia ratione delectus suscipit neque ex est minima rem iste eum nesciunt architecto fugit maxime quaerat dicta nobis quia obcaecati!
        Cum earum facere facilis eligendi explicabo laudantium repudiandae rem animi, provident quibusdam nemo harum quae quo eos est reprehenderit. Sunt dolor amet dignissimos cumque quisquam adipisci illo consectetur, voluptas asperiores.
        Nemo adipisci natus necessitatibus aut soluta ipsum debitis distinctio nisi omnis voluptates aspernatur totam alias dicta incidunt, similique sed tempore? Quis, architecto accusantium! Nobis corrupti molestiae in, laudantium ipsum reiciendis.
        Labore ducimus nostrum nisi, asperiores sit sint cumque itaque eligendi sunt quod tenetur numquam neque perferendis, distinctio soluta hic odio. Cumque, asperiores velit quibusdam veniam neque consequatur id consectetur aliquam?
        Sunt voluptates, expedita consequatur dolores nobis accusantium vero praesentium, officiis tenetur odit, corrupti a amet velit. Quam saepe quaerat natus perspiciatis dolorum praesentium ratione, optio neque cupiditate id veniam tempore!
        Quidem minima iure, exercitationem delectus doloremque ex eaque minus quo amet quis dolores aperiam aspernatur nisi impedit reiciendis illo. Animi deserunt ipsum ratione at sit, ipsa sequi voluptates minus? Quaerat!
        Magni vitae porro inventore possimus accusantium esse optio fuga fugit sunt et? Nesciunt ex dolorum molestias aperiam magnam tempore, tempora adipisci, cupiditate, illo explicabo in sit sint aliquam. Placeat, voluptatum.
        Rem quis aliquam, voluptatem voluptate nihil perferendis sint deleniti, laborum soluta, doloremque a minima. Atque, sunt eum rerum nulla eos necessitatibus dolor! Aspernatur facilis architecto, libero rerum voluptates ipsam sed.
        Vitae exercitationem, aliquam corporis neque delectus aspernatur. Consequuntur enim, porro officiis alias dolorem labore in id quia non explicabo! Qui voluptate dolore perferendis sit ut dicta iusto ipsa cum voluptatem?
        Repellendus quidem deleniti animi, facilis nam quis placeat expedita tempore ex eaque id iusto quae eveniet quasi voluptas reprehenderit assumenda libero voluptate, dolorum quibusdam nisi commodi. Fuga, quam dolorum. Cumque.</p>
    </div>
  );
}
