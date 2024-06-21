import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

export interface CarouselProps {
  children: React.ReactNode;
  isInfinite: boolean;
  visibleCards: number;  // Number of cards visible at once
  cardWidth: number;  // Width of each card in pixels
}

interface StyledProps {
  cardWidth: number;
}

const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const CarouselItem = styled.div<StyledProps>`
  flex: 0 0 ${(props) => `${props.cardWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.cardWidth}px`};
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

export const Carousel: React.FC<CarouselProps> = ({ children, isInfinite, visibleCards, cardWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(visibleCards); // Start at the first visible item
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transition, setTransition] = useState(true);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  const totalWidth = cardWidth * visibleCards;

  const nextSlide = useCallback(() => {
    setTransition(true);
    setCurrentIndex((prevIndex) => {
      if (isInfinite) {
        return prevIndex + 1;
      } else {
        return Math.min(prevIndex + 1, totalItems - visibleCards);
      }
    });
  }, [isInfinite, totalItems, visibleCards]);

  const prevSlide = useCallback(() => {
    setTransition(true);
    setCurrentIndex((prevIndex) => {
      if (isInfinite) {
        return prevIndex - 1;
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
    if (Math.abs(dragOffset) > cardWidth / 2) {
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
    if (isInfinite) {
      if (currentIndex >= totalItems + visibleCards) {
        setTransition(false);
        setCurrentIndex(visibleCards);
      }
      if (currentIndex <= 0) {
        setTransition(false);
        setCurrentIndex(totalItems);
      }
    }
  }, [currentIndex, isInfinite, totalItems, visibleCards]);

  useEffect(() => {
    if (!isDragging) {
      setDragOffset(0);
    }
  }, [isDragging]);

  return (
    <CarouselWrapper>
      <CarouselContainer
        ref={containerRef}
        style={{
          transform: `translateX(${(-currentIndex * cardWidth) + dragOffset}px)`,
          transition: transition ? 'transform 0.3s ease-in-out' : 'none',
          width: `${(totalItems + visibleCards * 2) * cardWidth}px`
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {isInfinite && childrenArray.slice(-visibleCards).map((child, index) => (
          <CarouselItem key={`prepend-${index}`} cardWidth={cardWidth}>
            {child}
          </CarouselItem>
        ))}
        {childrenArray.map((child, index) => (
          <CarouselItem key={index} cardWidth={cardWidth}>
            {child}
          </CarouselItem>
        ))}
        {isInfinite && childrenArray.slice(0, visibleCards).map((child, index) => (
          <CarouselItem key={`append-${index}`} cardWidth={cardWidth}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContainer>
      <PrevButton onClick={prevSlide}>&lt;</PrevButton>
      <NextButton onClick={nextSlide}>&gt;</NextButton>
    </CarouselWrapper>
  );
};
