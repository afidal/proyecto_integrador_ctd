import React from "react";
import { DesktopHeader } from "./DesktopHeader";
export default {
  title: "Organisms/Header/HeaderVersions/DesktopHeader",
  component: DesktopHeader,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <DesktopHeader {...args} />;

// 👇 Each story then reuses that template
export const DesktopLogged = Template.bind({});
DesktopLogged.args = {
  firstname: "martin",
  lastname: "frei",
};
export const DesktopUnLogged = Template.bind({});
DesktopUnLogged.args = {
  
};