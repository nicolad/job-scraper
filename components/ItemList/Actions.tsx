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
  return (
    <Space>
      <Button type="primary" danger onClick={() => deleteEntity(id)}>
        Delete
      </Button>
      <Button type="primary" onClick={() => hideEntity(id)}>
        Hide
      </Button>
    </Space>
  );
};

export default Actions;
