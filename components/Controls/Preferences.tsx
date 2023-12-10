import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Drawer, Button, Input, Checkbox } from "antd";

export const industryPreferenceAtom = atomWithStorage("industryPreference", {industry: "", searchInContent: false});

const Preferences = () => {
  const [visible, setVisible] = React.useState(false);
  const [industryPreference, setIndustryPreference] = useAtom(industryPreferenceAtom);
  
  const [currentIndustry, setCurrentIndustry] = React.useState(industryPreference.industry);
  const [searchInContent, setSearchInContent] = React.useState(industryPreference.searchInContent);


  useEffect(() => {
    setCurrentIndustry(industryPreference.industry);
    setSearchInContent(industryPreference.searchInContent);
  } , [industryPreference]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleIndustryChange = (e: any) => {
    setCurrentIndustry(e.target.value);
  };

  const handleSave = () => {
    setIndustryPreference({searchInContent: searchInContent, industry: currentIndustry});
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
          value={currentIndustry}
          onChange={handleIndustryChange}
          placeholder="Enter your industry in comma separated values"
        />
        <p>Search in content:</p>
        <Checkbox
          checked={searchInContent}
          onChange={(e) => setSearchInContent(e.target.checked) } 
        />
      </Drawer>
    </>
  );
};

export default Preferences;
