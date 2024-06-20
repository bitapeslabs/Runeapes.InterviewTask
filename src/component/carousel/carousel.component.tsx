import React, { useState, useRef, useEffect, ReactNode } from "react";
import { CarouselProps } from "./carousel.type";
import {
  CarouselButton,
  CarouselContainer,
  ErrorContainer,
} from "./carousel.styled";
import { CardContainer } from "./card/card.styled";

const Carousel: React.FC<CarouselProps> = ({
  children,
  isInfinite = false,
  error = "",
  count = 60,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [errors, setErrors] = useState(error);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<false>;
  const [cardCount, setCardCount] = useState(count);
  const [altChildren, setAltChildren] = useState<ReactNode[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [rotateValue, setRotateValue] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [timeTouched, setTimeTouched] = useState(0);

  const handleNext = (step: number) => {
    setCurrentIndex((prev) => prev + step);
  };

  const handlePrev = (step: number) => {
    setCurrentIndex((prev) => prev - step);
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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const pointX = event.changedTouches[0].screenX;
    setTouchStartPoint(pointX);
    setTimeTouched(Date.now());
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const pointX = event.changedTouches[0].screenX;
    setDeltaX(pointX - touchStartPoint);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const pointX = event.changedTouches[0].screenX;
    const deltaT = Date.now() - timeTouched;

    setVelocity(Math.floor(((pointX - touchStartPoint) / deltaT) * 3));
    setDeltaX(0);
  };

  const checkCardCount = () => {
    console.log("infinite:", isInfinite);
    if (count >= children.length)
      setCardCount(
        (prev) => Math.ceil(count / children.length) * children.length
      );
    else setCardCount((prev) => children.length);
  };

  useEffect(() => {
    checkCardCount();
  }, []);

  useEffect(() => {
    const iterates = Math.floor(cardCount / children.length);
    let elements: ReactNode[] = [];
    new Array(iterates).fill(0).map((item, index) => {
      elements = [...elements, ...children];
    });
    setAltChildren(elements);
  }, [cardCount]);

  useEffect(() => {
    if (trackRef.current && trackRef.current.children[0]) {
      checkCardWidth();
    }
    if (altChildren.length) {
    } else {
      setRotateValue(0);
    }
  }, [altChildren]);

  useEffect(() => {
    checkCardCount();
  }, [isInfinite]);

  useEffect(() => {
    console.log("velocity:", velocity);
    handlePrev(velocity);
  }, [velocity]);

  useEffect(() => {
    if (!isInfinite) {
      if (currentIndex < 0) setCurrentIndex(0);
      else if (currentIndex >= children.length)
        setCurrentIndex(children.length - 1);
    }
  }, [currentIndex]);
  return (
    <CarouselContainer
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchMove={(event) => handleTouchMove(event)}
      onTouchEnd={(event) => handleTouchEnd(event)}
    >
      {errors ? (
        <ErrorContainer>{errors}</ErrorContainer>
      ) : (
        <React.Fragment>
          {altChildren.map((item, index) => (
            <React.Fragment key={"wrapper_" + index}>
              {!isInfinite ? (
                index < children.length ? (
                  <CardContainer
                    style={{
                      transform: `rotateY(${(360 / altChildren.length) * (index - currentIndex) + (deltaX / (6600 * 3.141592654)) * 360}deg) translateZ(3300px)`,
                    }}
                  >
                    {item}
                  </CardContainer>
                ) : null
              ) : (
                <CardContainer
                  style={{
                    transform: `rotateY(${(360 / altChildren.length) * (index - currentIndex) + (deltaX / (6600 * 3.141592654)) * 360}deg) translateZ(3300px)`,
                  }}
                >
                  {item}
                </CardContainer>
              )}
            </React.Fragment>
          ))}
          <CarouselButton
            onClick={() => handlePrev(1)}
            style={{ left: 0 }}
            disabled={transitioning}
          >
            Prev
          </CarouselButton>
          <CarouselButton
            onClick={() => handleNext(1)}
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
