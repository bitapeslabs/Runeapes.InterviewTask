import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

export interface CarouselProps {
  children: React.ReactNode;
  isInfinite: boolean;
  width: number;
}

interface StyledProps {
  width: number;
}

const CarouselWrapper = styled.div<StyledProps>`
  display: flex;
  overflow: hidden;
  position: relative;
  width: ${(props) => `${props.width}px`};
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const CarouselItem = styled.div<StyledProps>`
  flex: 0 0 ${(props) => `${props.width}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.width}px`};
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

export const Carousel: React.FC<CarouselProps> = ({ children, isInfinite, width }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transition, setTransition] = useState(true);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const nextSlide = useCallback(() => {
    setTransition(true);
    setCurrentIndex((prevIndex) => {
      if (isInfinite) {
        return (prevIndex + 1) % totalItems;
      } else {
        return Math.min(prevIndex + 1, totalItems - 1);
      }
    });
  }, [isInfinite, totalItems]);

  const prevSlide = useCallback(() => {
    setTransition(true);
    setCurrentIndex((prevIndex) => {
      if (isInfinite) {
        return (prevIndex - 1 + totalItems) % totalItems;
      } else {
        return Math.max(prevIndex - 1, 0);
      }
    });
  }, [isInfinite, totalItems]);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setTransition(false);
    const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragStart(startX);
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragOffset(currentX - dragStart);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTransition(true);
    if (Math.abs(dragOffset) > width / 2) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      setDragOffset(0);
    }
  };

  useEffect(() => {
    if (isInfinite && currentIndex === totalItems) {
      setTransition(false);
      setCurrentIndex(0);
    }
    if (isInfinite && currentIndex === -1) {
      setTransition(false);
      setCurrentIndex(totalItems - 1);
    }
  }, [currentIndex, isInfinite, totalItems]);

  useEffect(() => {
    if (!isDragging) {
      setDragOffset(0);
    }
  }, [isDragging]);

  return (
    <CarouselWrapper width={width}>
      <CarouselContainer
        ref={containerRef}
        style={{
          transform: `translateX(${(-currentIndex * width) + dragOffset}px)`,
          transition: transition ? 'transform 0.3s ease-in-out' : 'none',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {isInfinite ? (
          <>
            <CarouselItem width={width}>{childrenArray[totalItems - 1]}</CarouselItem>
            {childrenArray.map((child, index) => (
              <CarouselItem key={index} width={width}>
                {child}
              </CarouselItem>
            ))}
            <CarouselItem width={width}>{childrenArray[0]}</CarouselItem>
          </>
        ) : (
          childrenArray.map((child, index) => (
            <CarouselItem key={index} width={width}>
              {child}
            </CarouselItem>
          ))
        )}
      </CarouselContainer>
      <PrevButton onClick={prevSlide}>&lt;</PrevButton>
      <NextButton onClick={nextSlide}>&gt;</NextButton>
    </CarouselWrapper>
  );
};
