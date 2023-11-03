import { Button, Space } from "antd";

export const Actions = ({
  tableName,
  getJobs,
  id,
}: {
  tableName: string;
  getJobs?: () => void;
  id: number;
}) => {
  const deleteJob = async (id: number) => {
    // await kv.del(id);
    // getJobs?.();
  };

  const hideJob = async (id: number) => {
    // await supabase.from(tableName).update({ hide: true }).eq("id", id);

    getJobs?.();
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
