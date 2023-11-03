import EditItem from "@/components/EditItem";
import ItemList from "@/components/ItemList";

import { cookies } from "next/headers";
import Filter from "@/components/Filter";

export default function Admin() {
  if (cookies().get("passwordCookie")?.value === process.env.ADMIN_PASSWORD) {
    return (
      <div>
        <h1>Admin Panel</h1>
        <EditItem />
        <Filter />
        <ItemList />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Access denied</h1>
      </div>
    );
  }
}
