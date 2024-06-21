import React, { useRef, useState, useEffect } from 'react';
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
`;

const CarouselItem = styled.div<StyledProps>`
  flex: 0 0 ${(props) => `${props.width}px`};
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

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (event: MouseEvent) => {
        setDragOffset(event.clientX - dragStart);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
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

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, dragStart, width]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isInfinite || prevIndex < totalItems - 1) {
        return (prevIndex + 1) % totalItems;
      }
      return prevIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isInfinite || prevIndex > 0) {
        return (prevIndex - 1 + totalItems) % totalItems;
      }
      return prevIndex;
    });
  };

  const handleDragStart = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(event.clientX);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    setDragOffset(event.touches[0].clientX - dragStart);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
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

  return (
    <CarouselWrapper width={width}>
      <CarouselContainer
        ref={containerRef}
        style={{
          transform: `translateX(${-currentIndex * width + dragOffset}px)`,
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {childrenArray.map((child, index) => (
          <CarouselItem key={index} width={width}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContainer>
      <PrevButton onClick={prevSlide}>&lt;</PrevButton>
      <NextButton onClick={nextSlide}>&gt;</NextButton>
    </CarouselWrapper>
  );
};
