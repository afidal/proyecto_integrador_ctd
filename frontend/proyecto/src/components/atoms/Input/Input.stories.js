import React from 'react'
import { Input } from './Input';

export default {
    title: "Atoms/Input",
    component: Input,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Input {...args} />;

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    placeholder: "This is a text input",
    type: "text",
    variant: "primary",
    size: "base",
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: "secondary",
  type: "password",
  placeholder: "This is a password input ",
};

export const Tertiary = Template.bind({});
Tertiary.args = { ...Primary.args, size:'md' };