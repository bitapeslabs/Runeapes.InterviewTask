import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Carousel, CarouselProps } from '../Carousel';

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta;

const Template: StoryFn<CarouselProps> = (args) => (
  <Carousel {...args}>
    <div style={{ backgroundColor: 'lightcoral', width:'300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Slide 1</div>
    <div style={{ backgroundColor: 'lightblue', width:'300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Slide 2</div>
    <div style={{ backgroundColor: 'lightgreen', width:'300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Slide 3</div>
    <div style={{ backgroundColor: 'lightyellow', width:'300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Slide 4</div>
    <div style={{ backgroundColor: 'lightpink', width:'300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Slide 5</div>
  </Carousel>
);

export const InfiniteCarousel = Template.bind({});
InfiniteCarousel.args = {
  isInfinite: true,
  width: 300,
};

export const NonInfiniteCarousel = Template.bind({});
NonInfiniteCarousel.args = {
  isInfinite: false,
  width: 300,
};
