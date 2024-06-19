import React, { Children, useMemo, TouchEvent } from "react";
import styled from "styled-components";

interface ICarouselProps {
  visibleItemsCount: number;
  withIndicator: boolean;
  isInfinite: boolean;
  children: React.ReactNode;
}

const Carousel: React.FC<ICarouselProps> = ({
  children,
  visibleItemsCount = 1,
  isInfinite,
  withIndicator,
}) => {
  const indicatorContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [timeoutInProgress, setTimeoutInProgress] = React.useState(false);

  const originalItemsLength = React.useMemo(() => Children.count(children), [children]);

  const isRepeating = React.useMemo(
    () => isInfinite && Children.count(children) > visibleItemsCount,
    [children, isInfinite, visibleItemsCount]
  );

  const [currentIndex, setCurrentIndex] = React.useState(
    isRepeating ? visibleItemsCount : 0
  );

  const [isTransitionEnabled, setTransitionEnabled] = React.useState(true);
  const [touchPosition, setTouchPosition] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (isRepeating) {
      if (currentIndex === visibleItemsCount || currentIndex === originalItemsLength) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, visibleItemsCount, originalItemsLength]);

  React.useEffect(() => {
    if (withIndicator) {
      const active = indicatorContainerRef.current?.querySelector<HTMLDivElement>(".dots-active");
      if (active) {
        const index = active.getAttribute("data-index");
        if (index !== null && indicatorContainerRef.current?.scrollTo) {
          indicatorContainerRef.current?.scrollTo({
            left: ((Number(index) - 2) / 5) * 50,
            behavior: "smooth",
          });
        }
      }
    }
  }, [withIndicator, currentIndex]);

  const nextItem = () => {
    const isOnEdgeForward = currentIndex > originalItemsLength;
    if (isOnEdgeForward) {
      setTimeoutInProgress(true);
    }

    if (isRepeating || currentIndex < originalItemsLength - visibleItemsCount) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const previousItem = () => {
    const isOnEdgeBack = isRepeating ? currentIndex <= visibleItemsCount : currentIndex === 0;

    if (isOnEdgeBack) {
      setTimeoutInProgress(true);
    }

    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      setCurrentIndex((prevState) => prevState + parseInt((diff / 7).toString()));
    }

    if (diff < -5) {
      previousItem();
    }

    setTouchPosition(null);
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(originalItemsLength);
      } else if (currentIndex >= originalItemsLength + visibleItemsCount) {
        setTransitionEnabled(false);
        setCurrentIndex(visibleItemsCount);
      }
    }

    setTimeoutInProgress(false);
  };

  const extraPreviousItems = React.useMemo(() => {
    let output: React.ReactNode[] = [];
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(Children.toArray(children)[originalItemsLength - 1 - index]);
    }
    output.reverse();
    return output;
  }, [children, originalItemsLength, visibleItemsCount]);

  const extraNextItems = React.useMemo(() => {
    let output: React.ReactNode[] = [];
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(Children.toArray(children)[index]);
    }
    return output;
  }, [children, visibleItemsCount]);

  const renderDots = React.useMemo(() => {
    let output: React.ReactNode[] = [];

    const localShow = isRepeating ? visibleItemsCount : 0;
    const localLength = isRepeating
      ? originalItemsLength
      : Math.ceil(originalItemsLength / visibleItemsCount);
    const calculatedActiveIndex =
      currentIndex - localShow < 0
        ? originalItemsLength + (currentIndex - localShow)
        : currentIndex - localShow;

    for (let index = 0; index < localLength; index++) {
      let className = "";
      if (calculatedActiveIndex === index) {
        className = "dots-active";
      } else {
        if (calculatedActiveIndex === 0) {
          if (calculatedActiveIndex + index <= 2) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        } else if (calculatedActiveIndex === localLength - 1) {
          if (Math.abs(calculatedActiveIndex - index) <= 2) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        } else {
          if (Math.abs(calculatedActiveIndex - index) === 1) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        }
      }
      output.push(<div key={index} data-index={index} className={className} />);
    }

    return output;
  }, [currentIndex, isRepeating, originalItemsLength, visibleItemsCount]);

  const isNextButtonVisible = useMemo(() => {
    return isRepeating || currentIndex < originalItemsLength - visibleItemsCount;
  }, [isRepeating, currentIndex, originalItemsLength, visibleItemsCount]);

  const isPrevButtonVisible = useMemo(
    () => isRepeating || currentIndex > 0,
    [isRepeating, currentIndex]
  );

  return (
    <StyledCarousel visibleItemsCount={visibleItemsCount}>
      <div className={`carousel-wrapper`}>
        {isPrevButtonVisible ? (
          <button
            disabled={timeoutInProgress}
            style={{
              cursor: timeoutInProgress ? "not-allowed" : "pointer",
              pointerEvents: timeoutInProgress ? "none" : "inherit",
            }}
            onClick={previousItem}
            className="left-arrow-button"
          >
            <span className="left-arrow" />
          </button>
        ) : null}
        <div
          className={`carousel-content-wrapper`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content`}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItemsCount) + 2}%)`,
              transition: !isTransitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {isRepeating && extraPreviousItems}
            {children}
            {isRepeating && extraNextItems}
          </div>
        </div>
        {isNextButtonVisible ? (
          <button
            disabled={timeoutInProgress}
            style={{
              cursor: timeoutInProgress ? "not-allowed" : "pointer",
              pointerEvents: timeoutInProgress ? "none" : "inherit",
            }}
            onClick={nextItem}
            className="right-arrow-button"
          >
            <span className="right-arrow" />
          </button>
        ) : null}
      </div>
      {withIndicator && (
        <div ref={indicatorContainerRef} className={`indicator-container `}>
          {renderDots}
        </div>
      )}
    </StyledCarousel>
  );
};

const StyledCarousel = styled.div<{ visibleItemsCount: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  .carousel-wrapper {
    display: flex;
    width: 100%;
    position: relative;
  }

  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .carousel-content {
    display: flex;
    gap: 3px;
    transition: all 250ms linear;
    -ms-overflow-style: none;
    /* hide scrollbar in IE and Edge */
    scrollbar-width: none;
    /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */

  .carousel-content::-webkit-scrollbar,
  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  .carousel-content > * {
    flex-shrink: 0;
    flex-grow: 1;
    width: ${({ visibleItemsCount }) => `calc(100% / ${visibleItemsCount})`};
  }

  .left-arrow-button,
  .right-arrow-button {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    transition: all 150ms linear;
  }

  .left-arrow-button:hover,
  .right-arrow-button:hover {
    background-color: #ddd;
  }

  .left-arrow-button:focus,
  .right-arrow-button:focus {
    outline: none;
  }

  .left-arrow-button {
    left: 24px;
  }

  .right-arrow-button {
    right: 24px;
  }

  .left-arrow {
    display: block;
    width: 0;
    height: 0;
    border-top: 7.5px solid transparent;
    border-bottom: 7.5px solid transparent;
    border-right: 10px solid #484848;
    border-left: 5px solid transparent;
    transform: translateX(-25%);
  }

  .right-arrow {
    display: block;
    width: 0;
    height: 0;
    border-top: 7.5px solid transparent;
    border-bottom: 7.5px solid transparent;
    border-left: 10px solid #484848;
    border-right: 5px solid transparent;
    transform: translateX(25%);
  }

  @media (hover: none) and (pointer: coarse) {
    .left-arrow-button,
    .right-arrow-button {
      display: none;
    }
  }

  .indicator-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem auto;
    -ms-overflow-style: none;
    /* hide scrollbar in IE and Edge */
    scrollbar-width: none;
    /* hide scrollbar in Firefox */
  }

  .indicator-container::-webkit-scrollbar,
  .indicator-container::-webkit-scrollbar {
    display: none;
  }

  .indicator-container {
    max-width: 56px;
    overflow: auto;
  }

  .indicator-container > * {
    margin-left: 6px;
    border-radius: 12px;
    transition-property: all;
    transition-duration: 250ms;
    transition-timing-function: linear;
  }

  .indicator-container > div:first-child {
    margin-left: 0px;
  }

  .indicator-container > .dots-active {
    width: 12px;
    height: 6px;
    background-color: #00000096;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .indicator-container > .dots-close {
    width: 6px;
    height: 6px;
    background-color: #00000033;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .indicator-container > .dots-far {
    width: 4px;
    height: 4px;
    margin-top: 1px;
    margin-bottom: 1px;
    background-color: #00000033;
    flex-shrink: 0;
    flex-grow: 1;
  }
`;
export default Carousel;
