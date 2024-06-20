import React, { useState, useEffect, ReactNode } from "react";
import {
  CarouselButton,
  CarouselContainer,
  ItemContainer,
} from "./Carousel.styled";

export type CarouselProps = {
  children: React.ReactNode[];
  itemWidth: number;
  isInfinite?: boolean;
};

const CARDS_IN_CIRCLE = 100;

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemWidth,
  isInfinite = false,
}) => {
  const [extendedItems, setExtendedItems] = useState<ReactNode[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const originalChildCount = children.length;
  const totalCards =
    Math.ceil(CARDS_IN_CIRCLE / originalChildCount) * originalChildCount;
  const radius = (totalCards * itemWidth) / Math.PI / 2;

  console.log({ totalCards, radius });

  const nextSlide = (step: number) => {
    setCurrentIdx((prev) => prev + step);
  };

  const prevSlide = (step: number) => {
    setCurrentIdx((prev) => prev - step);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = event.changedTouches[0].screenX;
    setTouchStartX(startX);
    setTouchStartTime(Date.now());
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentX = event.changedTouches[0].screenX;
    setMoveX(currentX - touchStartX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0].screenX;
    const elapsedTime = Date.now() - touchStartTime;

    prevSlide(Math.floor((endX - touchStartX) / elapsedTime));
    setMoveX(0);
  };
  useEffect(() => {
    const repeatCount = Math.floor(totalCards / originalChildCount);
    let newChildren: ReactNode[] = [];
    Array.from({ length: repeatCount }).forEach(() => {
      newChildren.push(...children);
    });
    setExtendedItems(newChildren);
  }, [totalCards]);

  useEffect(() => {
    if (!isInfinite) {
      if (currentIdx < 0) setCurrentIdx(0);
      else if (currentIdx >= originalChildCount)
        setCurrentIdx(originalChildCount - 1);
    }
  }, [currentIdx, isInfinite, originalChildCount]);

  return (
    <CarouselContainer
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchMove={(event) => handleTouchMove(event)}
      onTouchEnd={(event) => handleTouchEnd(event)}
    >
      {extendedItems.map((item, index) =>
        isInfinite || index < children.length ? (
          <ItemContainer
            style={{
              width: itemWidth,
              transform: `rotateY(${(360 * (index - currentIdx)) / extendedItems.length + (360 * moveX) / (totalCards * itemWidth)}deg) translateZ(${radius}px)`,
            }}
          >
            {item}
          </ItemContainer>
        ) : (
          <></>
        )
      )}
      <CarouselButton onClick={() => prevSlide(1)} style={{ left: 0 }}>
        &#8249;
      </CarouselButton>
      <CarouselButton onClick={() => nextSlide(1)} style={{ right: 0 }}>
        {" "}
        &#8250;
      </CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;
