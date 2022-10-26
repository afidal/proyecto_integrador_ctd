import React from "react";
import { FooterMobile } from "./FooterMobile";
export default {
  title: "Organisms/Footer/FooterVersions/FooterMobile",
  component: FooterMobile,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <FooterMobile {...args} />;

// 👇 Each story then reuses that template
export const Footer = Template.bind({});
Footer.args = {};
