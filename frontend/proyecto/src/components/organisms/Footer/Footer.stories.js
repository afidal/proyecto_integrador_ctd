import React from "react";
import { Footer } from "./Footer";
export default {
  title: "Organisms/Footer",
  component: Footer,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Footer {...args} />;

// 👇 Each story then reuses that template
export const MainFooter = Template.bind({});
MainFooter.args = {};
