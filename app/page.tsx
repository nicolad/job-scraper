import ItemList from "@/components/ItemList";

import { PageWrapper } from "./styles";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <PageWrapper>
      <h1>Icon Voter</h1>
      <p>Vote for the icons you want to see next!<br />
      You can vote once every 5 seconds.</p>
      <p>Check out my packs {" "}
        <a href="https://rhosgfx.itch.io" target="_blank">
          here
        </a>
      .</p>
      <Filter />
      <ItemList />
    </PageWrapper>
  );
}
