import { kv } from "@vercel/kv";
import Item from "@/components/Item";
import { ItemListWrapper } from "./styles";
import { ItemData } from "@/utils/types";

export default async function ItemList() {
  // Bring data to frontend
  const names = await kv.keys("*");
  const data = await kv.lrange("jobs", 0, 1000);
  const jobs = data?.filter((d) => !d?.hide);
  return (
    <ItemListWrapper>
      {jobs.map((itemData, index) => {
        return (
          <Item
            key={index}
            name={itemData.url}
            status={itemData.status}
            votes={itemData.votes}
            url={itemData.url}
          />
        );
      })}
    </ItemListWrapper>
  );
}
