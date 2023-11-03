import { kv } from "@vercel/kv";
import { ItemListWrapper } from "./styles";
import { Jobs } from "./Jobs";

export default async function ItemList() {
  const data = await kv.lrange("jobs2", 0, 1000);
  const jobs = data?.filter((d) => !d?.hide);

  return (
    <ItemListWrapper>
      <Jobs jobs={jobs} />
    </ItemListWrapper>
  );
}
