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
  const existingRecords = [{}];

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
  } catch (error) {
    console.error(
      `An error occurred while inserting records into ${tableName}: ${error}`
    );
  }
};
