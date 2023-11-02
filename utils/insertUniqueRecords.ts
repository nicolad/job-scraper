import { kv } from "@vercel/kv";
import _ from "lodash";

export const insertUniqueRecords = async (
  data: any[],
  tableName: string,
  uniqueProperty: string
) => {
  if (_.isEmpty(data)) {
    return;
  }
  if (process.env.NEXT_VERBOSITY === "debug") {
    console.log("insertUniqueRecords: ", data);
  }
  // Fetch existing records from the specified table
  const existingRecords = await kv.lrange(tableName, 0, 1000);

  // Extract the values of the unique property from the existing records
  const existingUniqueValues = _.map(existingRecords, uniqueProperty);
  if (process.env.NEXT_VERBOSITY === "debug") {
    console.log("Existing Unique Values: ", existingUniqueValues);
  }

  // Filter out the data that already exists in the table
  const uniqueRecords = data?.filter(
    (record: any) =>
      !_.some(existingUniqueValues, (value) => value === record[uniqueProperty])
  );

  try {
    if (_.isEmpty(uniqueRecords)) {
      console.log(`No new records to insert into ${tableName}`);
      return;
    }
    await kv.lpush(tableName, ...uniqueRecords);

    // if (error) {
    //   console.log(`Error inserting records into ${tableName}:`, error);
    // } else {
    //   console.log(
    //     `Inserted ${uniqueRecords.length} new records into ${tableName}`
    //   );
    // }
  } catch (error) {
    console.error(
      `An error occurred while inserting records into ${tableName}: ${error}`
    );
  }
};
