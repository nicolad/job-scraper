// import { SupabaseClient } from "@supabase/supabase-js";
import _ from "lodash";

export const getUniqueRecords = async (
  supabase?: any,
  data?: any[],
  tableName?: string,
  uniqueProperty?: string
): Promise<any> => {
  if (_.isEmpty(data)) {
    return;
  }
  if (process.env.NEXT_VERBOSITY === "debug") {
    console.log("getUniqueRecords: ", data);
  }
  // Fetch existing records from the specified table
  const { data: existingRecords } = await supabase.from(tableName).select();

  // Extract the values of the unique property from the existing records
  const existingUniqueValues = _.map(existingRecords, uniqueProperty);

  // Filter out the data that already exists in the table
  const uniqueRecords = data?.filter(
    (record: any) =>
      !_.some(
        existingUniqueValues
        // (value) => value === record?.[uniqueProperty]
      )
  );
  console.log("Unique Records: ", uniqueRecords);

  try {
    if (_.isEmpty(uniqueRecords)) {
      console.log(`No new records`);
      return;
    } else {
      return uniqueRecords;
    }
  } catch (error) {
    console.error(
      `An error occurred while inserting records into ${tableName}: ${error}`
    );
  }
};
