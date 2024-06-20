import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./Carousel";
import styled from "styled-components";

import React from "react";

import slide1 from "./assets/images/slide1.png";
import slide2 from "./assets/images/slide2.png";
import slide3 from "./assets/images/slide3.png";
import slide4 from "./assets/images/slide4.png";
import slide5 from "./assets/images/slide4.png";

const slides = [slide1, slide2, slide3, slide4, slide5];

const meta = {
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const SlideContainer = styled.div`
border-radius: 40px;
overflow: hidden;
height: 400px;

img {
  width: 100%;
  height: 100%;
}
`;

export const Default: Story = {
  args: {
    withIndicator: true,
    isInfinite: true,
    children: slides.map((slide, index) => {
      return (
        <SlideContainer key={index}>
          <img src={slide} alt="slide" />
        </SlideContainer>
      );
    }),
  },
};

export const definite: Story = {
  args: {
    withIndicator: true,
    isInfinite: false,
    children: slides.map((slide, index) => {
      return (
        <SlideContainer key={index}>
          <img src={slide} alt="slide" />
        </SlideContainer>
      );
    }),
  },
};

export const withoutIndicator: Story = {
  args: {
    withIndicator: false,
    isInfinite: false,
    children: slides.map((slide, index) => {
      return (
        <SlideContainer key={index}>
          <img src={slide} alt="slide" />
        </SlideContainer>
      );
    }),
  },
};