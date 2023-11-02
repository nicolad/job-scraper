"use server";

import { kv } from "@vercel/kv";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteItem(name:string) {
  await kv.del(name);
  revalidateTag("");
}

export async function upvoteItem(name:string, total:number) {
  await kv.hset(name, {votes: total + 1});
  revalidatePath("");
}