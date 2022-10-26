import React from "react";
import {MobileHeader} from "./MobileHeader";
export default {
  title: "Organisms/Header/HeaderVersions/MobileHeader",
  component: MobileHeader,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MobileHeader {...args} />;

// 👇 Each story then reuses that template
export const MobileLogged = Template.bind({});
MobileLogged.args = {
  firstname:'martin',
  lastname:'frei',
};
export const MobileUnLogged = Template.bind({});
MobileUnLogged.args = {
  
};



