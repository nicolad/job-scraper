import _ from "lodash";

export const insertRecords = async (data: any[], tableName: string) => {
  if (_.isEmpty(data)) {
    return;
  }
  try {
    if (_.isEmpty(data)) {
      console.log(`No new records to insert into ${tableName}`);
      return;
    }

    // Insert the unique records into the specified table
  } catch (error) {
    console.error(
      `An error occurred while inserting records into ${tableName}: ${error}`
    );
  }
};
