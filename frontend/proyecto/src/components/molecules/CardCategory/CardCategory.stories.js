import React from "react";
import { CardCategory } from "./CardCategory";

export default {
  title: "Molecules/CardCategory",
  component: CardCategory,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CardCategory {...args} />;

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    titulo:'Hoteles',
    descripcion:'800',
    url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469",
    id:1,
    toShow:true,
};
