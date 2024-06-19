import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";

export default {
  component: Carousel,
  title: "libraiger/Carousel",
} as Meta;

type Story = StoryObj<typeof Carousel>;

export const InfinitCarousel: Story = (args) => <Carousel {...args} />;
InfinitCarousel.args = {
  isInfinite: true,
  datas: 10,
  viewCount: 3,
  fullWidth: false,
  viewHeight: 500,
  viewWidth: 800,
};
