import { EditItemWrapper } from "./styles";
import { revalidatePath } from "next/cache";

async function createItem(formData: FormData) {
  "use server";

  revalidatePath("");
}

export default function EditItem() {
  return (
    <EditItemWrapper>
      <form action={createItem}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue=""
            autoComplete="on"
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" defaultValue="Not Done" required>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Done">Not Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="votes">Votes:</label>
          <input
            type="number"
            id="votes"
            name="votes"
            min="0"
            defaultValue={0}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            defaultValue=""
            autoComplete="on"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </EditItemWrapper>
  );
}
