import React from "react";
import {Icon} from "./Icon";

export default {
  title: "Atoms/Icon",
  component: Icon,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Icon {...args} />;

// 👇 Each story then reuses that template
export const User = Template.bind({});
User.args = {
    icon:'user',
    width:'lg'
};
export const Calendar = Template.bind({});
Calendar.args = {
  icon: "calendar",
  width: "md",
};
export const Search = Template.bind({});
Search.args = {
  icon: "search",
  width: "lg",
};
export const Location = Template.bind({});
Location.args = {
  icon: "location",
  width: "sm",
};
export const Disabled = Template.bind({});
Disabled.args = {
  icon: "disabled",
  width: "lg",
};
export const Wifi = Template.bind({});
Wifi.args = {
  icon: "wifi",
  width: "sm",
};
export const Swim = Template.bind({});
Swim.args = {
  icon: "swim",
  width: "lg",
};
export const Star = Template.bind({});
Star.args = {
  icon: "star",
  width: "xs",
};
export const Close = Template.bind({});
Close.args = {
  icon: "close",
  width: "xs",
};

export const CloseBlack = Template.bind({});
CloseBlack.args = {
  icon: "closeBlack",
  width: "xs",
};