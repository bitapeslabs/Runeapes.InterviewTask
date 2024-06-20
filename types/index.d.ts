import React from "react";

export interface CarouselProps {
  itemWidth: number;
  isInfinite: boolean;
}
declare const Carousel: ({ itemWidth, isInfinite }: CarouselProps) => React.JSX.Element;
export default Carousel;
