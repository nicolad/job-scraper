import { SupabaseClient } from "@supabase/supabase-js";
import _ from "lodash";

export const insertRecords = async (
  supabase: SupabaseClient,
  data: any[],
  tableName: string
) => {
  if (_.isEmpty(data)) {
    return;
  }
  try {
    if (_.isEmpty(data)) {
      console.log(`No new records to insert into ${tableName}`);
      return;
    }

    // Insert the unique records into the specified table
    const { error } = await supabase.from(tableName).upsert(data);

    if (error) {
      console.log(`Error inserting records into ${tableName}:`, error);
    } else {
      console.log(`Inserted ${data.length} new records into ${tableName}`);
    }
  } catch (error) {
    console.error(
      `An error occurred while inserting records into ${tableName}: ${error}`
    );
  }
};
