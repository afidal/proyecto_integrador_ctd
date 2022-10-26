import React from "react";
import { Picture } from "./Picture";

export default {
  title: "Atoms/Picture",
  component: Picture,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Picture {...args} />;

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    width:'xs',
    height:'xs',
    image:'logo',
};

