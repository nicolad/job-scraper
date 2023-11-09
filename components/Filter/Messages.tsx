import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Modal, Button } from "antd";

const PollingComponent = ({ threadID }: { threadID: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(Boolean(threadID));

  const fetchData = async () => {
    const { data } = await axios.get(`/api/messages?threadID=${threadID}`);
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["pollData", threadID],
    queryFn: fetchData,
    refetchInterval: 2000,
    enabled: Boolean(threadID),
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log("threadID", { threadID });

  return (
    <>
      <Button type="primary" onClick={showModal} disabled={!threadID}>
        Open Polling Modal
      </Button>
      <Modal
        title="Polling Data"
        open={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {isLoading && <p>Loading...</p>}
        {!isLoading && !isError && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Modal>
    </>
  );
};

export default PollingComponent;
