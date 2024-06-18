import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Carousel from ".";
import { defaultProps } from "./defaultProps";
import "../../styles/styles.module.css";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  argTypes: {
    children: { control: { disable: true } },
    show: { control: "number" },
    slide: { control: "number" },
    transition: { control: "number" },
    swiping: { control: "boolean" },
    infinite: { control: "boolean" },
    hideArrows: { control: "boolean" },
    autoSwipe: { control: "number" },
    useArrowKeys: { control: "boolean" },
    className: { control: "text" },
  },
} as Meta;
export default meta;
type Story = StoryObj<typeof Carousel>;

export const MultipleItems: Story = {
  args: {
    ...defaultProps,
    show: 3,
    slide: 1,
  },
};

export const InfiniteLoop: Story = {
  args: {
    ...defaultProps,
    infinite: true,
    autoSwipe: 3000,
  },
};
