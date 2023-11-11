import React from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Drawer, Button, Input } from "antd";

const industryPreferenceAtom = atomWithStorage("industryPreference", "");

const Preferences = () => {
  const [visible, setVisible] = React.useState(false);
  const [industryPreference, setIndustryPreference] = useAtom(
    industryPreferenceAtom
  );

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleIndustryChange = (e: any) => {
    setIndustryPreference(e.target.value);
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open Preferences
      </Button>
      <Drawer
        title="Preferences"
        placement="right"
        onClose={onClose}
        open={visible}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSave} type="primary">
              Save
            </Button>
          </div>
        }
      >
        <p>Industry:</p>
        <Input
          value={industryPreference}
          onChange={handleIndustryChange}
          placeholder="Enter your industry in comma separated values"
        />
      </Drawer>
    </>
  );
};

export default Preferences;
