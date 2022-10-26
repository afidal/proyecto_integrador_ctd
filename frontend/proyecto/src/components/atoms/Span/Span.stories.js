import React from "react";
import {Span} from "./Span";

export default {
  title: "Atoms/Span",
  component: Span,

};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Span {...args} />;

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    size:'md',
    text:'soy un span',
    variant:'blue',  
};