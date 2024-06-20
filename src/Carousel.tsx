import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";

interface CarouselProps {
  children: React.ReactNode[];
  isInfinite?: boolean;
  interval?: number;
  error?: string;
  count?: number;
}

const CarouselContainer = styled.div<{ isInfinite: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ isInfinite }) => (isInfinite ? `center` : `start`)};
  overflow: hidden;
`;

const CarouselTrack = styled.div<{ translateX: number; deltaX: number }>`
  display: flex;
  transform: ${({ translateX, deltaX }) =>
    `translateX(${translateX + deltaX}px)`};
  transition: ${({ deltaX }) => `transform ${deltaX ? "0" : "0.8"}s ease-out`};
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: red;
  border: 1px solid red;
`;

const Carousel: React.FC<CarouselProps> = ({
  children,
  isInfinite = false,
  interval = 3000,
  error = "",
  count = 21,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(interval);
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [errors, setErrors] = useState(error);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<false>;
  const [cardCount, setCardCount] = useState(count);
  const [altChildren, setAltChildren] = useState<ReactNode[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  const handleNext = () => {
    if (isInfinite) setCurrentIndex(1);
    else
      setCurrentIndex(
        currentIndex < children.length - 1
          ? currentIndex + 1
          : children.length - 1
      );
    setTimeout(() => {
      if (isInfinite) {
        const firstChild = altChildren.shift();
        setAltChildren([...altChildren, firstChild]);
        setCurrentIndex(0);
      } else {
        setTransitioning(false);
      }
    }, 800);
  };

  const handlePrev = () => {
    if (isInfinite) setCurrentIndex(-1);
    else setCurrentIndex(currentIndex - 1 > 0 ? currentIndex - 1 : 0);
    setTimeout(() => {
      if (isInfinite) {
        const lastChild = altChildren.pop();
        setAltChildren([lastChild, ...altChildren]);
        setCurrentIndex(0);
      } else {
        setTransitioning(false);
      }
    }, 800);
  };

  const runInfinite = () => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + 1;
        if (newIndex === children.length) {
          return 0;
        }
        return newIndex;
      });
    }, scrollInterval);
  };

  const checkCardWidth = () => {
    if (!trackRef.current) return;
    if (!children.length) return;

    const childElements = Array.from(trackRef.current.children);
    let firstChildWidth = childElements[0].children[0].clientWidth;
    const isAllSameWidth = childElements.every(
      (child) => child.children[0].clientWidth === firstChildWidth
    );

    if (!isAllSameWidth) {
      setErrors(
        "The Carousel component should accept multiple children of the same width."
      );
    }
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    const pointX = event.changedTouches[0].screenX;
    setTouchStartPoint(pointX);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    const pointX = event.changedTouches[0].screenX;
    setDeltaX(pointX - touchStartPoint);
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    const pointX = event.changedTouches[0].screenX;

    setDeltaX(0);
    if (pointX > touchStartPoint) {
      handlePrev();
    } else if (pointX < touchStartPoint) {
      handleNext();
    }
  };

  const checkCardCount = () => {
    if (isInfinite) {
      if (count >= children.length)
        setCardCount(
          (prev) => Math.ceil(count / children.length) * children.length
        );
      else setCardCount((prev) => children.length);
    } else {
      setCardCount(children.length);
    }
  };

  const getOdd = (array: ReactNode[]) => {
    const result = [...array];
    if (isInfinite) result.pop();
    return result;
  };

  useEffect(() => {
    checkCardCount();
  }, []);

  useEffect(() => {
    if (isInfinite) {
      const iterates = Math.floor(cardCount / children.length);
      let elements: ReactNode[] = [];
      new Array(iterates).fill(0).map((item, index) => {
        elements = [...elements, ...children];
      });
      setAltChildren(elements);
    } else {
      setAltChildren([...children]);
    }
  }, [cardCount]);

  useEffect(() => {
    if (trackRef.current && trackRef.current.children[0]) {
      setTrackWidth(trackRef.current.children[0].clientWidth);
      checkCardWidth();
    }
  }, [altChildren]);

  useEffect(() => {
    if (currentIndex) {
      setTransitioning(true);
      setTimeout(() => {
        if (trackRef.current && isInfinite)
          trackRef.current.style.transition = "none";
      }, 800);
    } else {
      setTransitioning(false);
      if (trackRef.current && isInfinite) {
        trackRef.current.style.transition = `transform ${deltaX ? "0" : "0.8"}s ease-out`;
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    checkCardCount();
  }, [isInfinite]);
  return (
    <CarouselContainer isInfinite={isInfinite}>
      {errors ? (
        <ErrorContainer>{errors}</ErrorContainer>
      ) : (
        <React.Fragment>
          <CarouselTrack
            translateX={-currentIndex * trackWidth}
            deltaX={deltaX}
            ref={trackRef}
          >
            {altChildren.length % 2
              ? altChildren.map((child, index) => (
                  <div
                    key={index}
                    onTouchStart={(event) => handleTouchStart(event, index)}
                    onTouchMove={(event) => handleTouchMove(event, index)}
                    onTouchEnd={(event) => handleTouchEnd(event, index)}
                  >
                    {child}
                  </div>
                ))
              : getOdd(altChildren).map((child, index) => (
                  <div
                    key={index}
                    onTouchStart={(event) => handleTouchStart(event, index)}
                    onTouchMove={(event) => handleTouchMove(event, index)}
                    onTouchEnd={(event) => handleTouchEnd(event, index)}
                  >
                    {child}
                  </div>
                ))}
          </CarouselTrack>
          <CarouselButton
            onClick={handlePrev}
            style={{ left: 0 }}
            disabled={transitioning}
          >
            Prev
          </CarouselButton>
          <CarouselButton
            onClick={handleNext}
            style={{ right: 0 }}
            disabled={transitioning}
          >
            Next
          </CarouselButton>
        </React.Fragment>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
