import { Button, Space } from "antd";
import { deleteEntity, hideEntity } from "../../app/actions";

export const Actions = ({
  getJobs,
  id,
}: {
  tableName: string;
  getJobs?: () => void;
  id: string;
}) => {
  const deleteJob = async (id: string) => {
    await deleteEntity(id);
  };

  const hideJob = async (id: string) => {
    await hideEntity(id);
  };

  return (
    <Space>
      <Button type="primary" danger onClick={() => deleteJob(id)}>
        Delete
      </Button>
      <Button type="primary" onClick={() => hideJob(id)}>
        Hide
      </Button>
    </Space>
  );
};

export default Actions;
