import React from "react";
interface CarouselProps {
    children: React.ReactNode[];
    isInfinite?: boolean;
    interval?: number;
    error?: string;
    count?: number;
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
