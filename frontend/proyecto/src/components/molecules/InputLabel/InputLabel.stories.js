import React from "react";
import { InputLabel } from "./InputLabel";

export default {
  title: "Molecules/InputLabel",
  component: InputLabel,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <InputLabel {...args} />;

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    input:{
        placeholder:'Esto es un input text',
        type:'text',
        size:'md'
    },
    label:'Esto es un label',

};
export const Secondary = Template.bind({});
Secondary.args = {
    ...Default.args,
    label: "Este es otro label",
    isInline: true,
    input: { placeholder: "Esto es un   input password" ,type:'password',size:'sm'},
};

