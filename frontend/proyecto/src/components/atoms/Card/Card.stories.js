import React from "react";
import Card from "./Card";

export default {
    title: "Atoms/Card",
    component: Card,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Card {...args} />;

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  width: "310",
  height: "246",
  borderRadius: true,
};
export const Primary = Template.bind({});
Primary.args = {
    
  width: 100,
  height: "139",
  borderRadius:false,
  backgroundColor:'primary'
};
export const Secondary = Template.bind({});
Secondary.args = {
  width: 100,
  height: "139",
  borderRadius: false,
  backgroundColor: "secondary",
};

