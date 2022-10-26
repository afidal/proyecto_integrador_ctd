import React from "react";
import { SignUp } from "./SignUp";

export default {
  title: "Pages/SignUp",
  component: SignUp,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <SignUp {...args} />;

// 👇 Each story then reuses that template
export const SignUpPage = Template.bind({});
SignUpPage.args = {
  firstname: undefined,
  lastname: undefined,
};
