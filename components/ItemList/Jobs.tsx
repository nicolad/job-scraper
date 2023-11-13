"use client";

import { Tag, Modal, Table, Space } from "antd";

import Actions from "./Actions";
import { useState } from "react";

export const Jobs = ({ jobs }: { jobs: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );

  const showModal = (description: string) => {
    setSelectedDescription(description);
    setIsModalVisible(true);
  };

  const renderBadges = (labels: any[]) => (
    <>
      {labels &&
        labels.map((label, labelIndex) => (
          <Space key={labelIndex} size={[0, 8]} wrap>
            {Object.keys(label).map((key, keyIndex) => {
              const color = Boolean(label[key]) ? "green" : "red";
              const isBoolean = label[key] === true || label[key] === false;

              return (
                <Tag color={color} key={keyIndex}>{`${key}: ${
                  !isBoolean && String(label[key])
                }`}</Tag>
              );
            })}
          </Space>
        ))}
    </>
  );

  const columns = [
    {
      title: "Description",
      dataIndex: "content",
      key: "description",
      render: (text: string) => (
        <span onClick={() => showModal(text)}>show</span>
      ),
    },
    {
      title: "Labels",
      dataIndex: "labels",
      key: "labels",
      render: (text: string, record: any) => <>{renderBadges(record.labels)}</>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: { url: string }) => (
        <Actions id={record?.url} tableName="jobs" />
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={{ pageSize: 1000 }}
        dataSource={jobs}
        columns={columns}
      />
      <Modal
        title="Job Description"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedDescription}
      </Modal>
    </>
  );
};
