import React from "react";
import { Avatar } from "./Avatar";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Avatar {...args} />;

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    firstname:'martin',
    lastname:'frei',
    variant:'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    variant:'secondary',
};
