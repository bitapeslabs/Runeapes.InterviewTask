import React from "react";
import { Meta, Story } from "@storybook/react";
import Carousel from "../Carousel";
import DummyCard from "./DummyCard/DummyCard";

export default {
  title: "Example/Carousel",
  component: Carousel,
} as Meta;

const Template: Story<any> = (args: any) => {
  return (
    <React.Fragment>
      <Carousel {...args}>
        {Array.from({ length: 12 }).map((_, index) => (
          <DummyCard key={index}>
            <h2>{index + 1}</h2>
          </DummyCard>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

export const Small = Template.bind({});
Small.args = {
  isInfinite: false,
  itemWidth: 150,
};

export const Big = Template.bind({});
Big.args = {
  isInfinite: false,
  itemWidth: 500,
};

export const Infinite = Template.bind({});
Infinite.args = {
  isInfinite: true,
  itemWidth: 500,
};
