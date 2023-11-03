import ItemList from "@/components/ItemList";

import { PageWrapper } from "./styles";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <PageWrapper>
      <Filter />
      <ItemList />
    </PageWrapper>
  );
}
