import React from "react";
import { Meta, Story } from "@storybook/react";
import Carousel from "./carousel.component";
import CarouselItem from "./card/card.component";

export default {
  title: "Example/Carousel",
  component: Carousel,
} as Meta;

const Template: Story<any> = (args: any) => (
  <React.Fragment>
    <Carousel {...args}>
      {new Array(4).fill(0).map((item, index) => (
        <CarouselItem key={"card_" + index}>
          <h2>{`Card ${index + 1}`}</h2>
          {`Content ${index + 1}`}
        </CarouselItem>
      ))}
    </Carousel>
  </React.Fragment>
);

export const Default = Template.bind({});
Default.args = {
  isInfinite: false,
};

export const Infinite = Template.bind({});
Infinite.args = {
  isInfinite: true,
};
