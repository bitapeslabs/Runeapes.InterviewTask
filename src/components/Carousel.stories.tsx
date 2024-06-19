import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./Carousel";
import "../App.css";

import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.png";
import slide3 from "../assets/images/slide3.png";
import slide4 from "../assets/images/slide4.png";
import slide5 from "../assets/images/slide4.png";

const slides = [slide1, slide2, slide3, slide4, slide5];

const meta = {
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visibleItemsCount: 3,
    withIndicator: true,
    isInfinite: true,
    children: slides.map((slide, index) => {
      return (
        <div key={index} className="slide-container">
          <img src={slide} alt="slide" />
        </div>
      );
    }),
  },
};

export const definite: Story = {
  args: {
    visibleItemsCount: 3,
    withIndicator: true,
    isInfinite: false,
    children: slides.map((slide, index) => {
      return (
        <div key={index} className="slide-container">
          <img src={slide} alt="slide" />
        </div>
      );
    }),
  },
};

export const withoutIndicator: Story = {
  args: {
    visibleItemsCount: 3,
    withIndicator: false,
    isInfinite: false,
    children: slides.map((slide, index) => {
      return (
        <div key={index} className="slide-container">
          <img src={slide} alt="slide" />
        </div>
      );
    }),
  },
};