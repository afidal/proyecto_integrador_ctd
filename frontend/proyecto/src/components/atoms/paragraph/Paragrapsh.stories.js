import React from "react";
import {Paragraph} from "./Paragraph";

export default {
  title: "Atoms/Paragraph",
  component: Paragraph,
 
};


//👇 We create a “template” of how args map to rendering
const Template = (args) => <Paragraph {...args} />;


// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    size:'md',
    text:'soy un párrafo',
    variant:'primary',
    
};

