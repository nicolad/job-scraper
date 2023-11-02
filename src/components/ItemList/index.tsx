import { kv } from "@vercel/kv";
import Item from "@/components/Item";
import { ItemListWrapper } from "./styles";
import { ItemData } from "@/utils/types";

export default async function ItemList() {
  // Bring data to frontend
  const names = await kv.keys("*");
  const data = await Promise.all(
    names.map(async (name) => {
      const itemData = await kv.hgetall(name);
      return itemData! as ItemData;
    })
  );

  data.sort((a, b) => parseInt(b.votes) - parseInt(a.votes));

  return (
    <ItemListWrapper>
      {data.map((itemData, index) => {
        return (
          <Item
            key={index}
            name={itemData.name}
            status={itemData.status}
            votes={itemData.votes}
            url={itemData.url}
          />
        );})
      }
    </ItemListWrapper>
  );
}
