import React from "react";
import {Button} from "./Button";




export default {
  title: "Atoms/Button",
  component: Button,
 
};


//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    size:'md',
    label:'Button 1',
    variant:true,
    
};



export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: "Button 2", variant: false,click:()=>{} };
