import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "libraiger/Carousel",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Primary: Story = (args) => <Carousel {...args} />;
Primary.args = {
  isInfinite: true,
  datas: [
    {
      image:
        "https://cdn.pixabay.com/photo/2022/01/29/11/58/dog-6977210_1280.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_1280.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/11/17/13/13/puppy-1047521_1280.jpg",
    },
    {
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      image:
        "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      image: "https://assets.codepen.io/3685267/timed-cards-4.jpg",
    },
    {
      image: "https://assets.codepen.io/3685267/timed-cards-6.jpg",
    },
  ],
};
