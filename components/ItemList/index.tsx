import { kv } from "@vercel/kv";
import { ItemListWrapper } from "./styles";
import { Jobs } from "./Jobs";

export default async function ItemList() {
  const names = await kv.keys("*");

  const jobs = await Promise.all(
    names.map(async (name) => {
      const itemData = await kv.hgetall(name);
      return itemData!;
    })
  );
  // const jobs = data?.filter((d) => !d?.hide);
  console.log(jobs);

  return (
    <ItemListWrapper>
      <Jobs jobs={jobs} />
    </ItemListWrapper>
  );
}
