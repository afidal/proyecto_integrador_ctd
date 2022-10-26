import React from "react";
import { TabletHeader } from "./TabletHeader";
export default {
  title: "Organisms/Header/HeaderVersions/TabletHeader",
  component: TabletHeader,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <TabletHeader {...args} />;

// 👇 Each story then reuses that template
export const TabletLogged = Template.bind({});
TabletLogged.args = {
  firstname: "martin",
  lastname: "frei",
};
export const TabletUnLogged = Template.bind({});
TabletUnLogged.args = {
  
};
