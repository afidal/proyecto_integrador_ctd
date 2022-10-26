import React from "react";
import { Header } from "./Header";
export default {
  title: "Organisms/Header",
  component: Header,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Header {...args} />;

// 👇 Each story then reuses that template
export const Logged = Template.bind({});
Logged.args = {
    firstname: "martin",
    lastname: "frei",
};
export const UnLogged = Template.bind({});
UnLogged.args = {};
