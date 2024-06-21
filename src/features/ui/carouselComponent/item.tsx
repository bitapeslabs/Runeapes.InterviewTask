import { useEffect, useLayoutEffect, useRef } from "react";
import * as S from "./item.styled";
import { IItemData } from "../../../utils/typesUtils";
import { useMachine } from "@xstate/react";
import { appMachine } from "../../../machines/appMachine";

export const Item = ({
  $itemWidth,
  $isInfinite,
  $viewCount,
  $totalCount,
  $index,
  id,
  $backgroundColor,
  direction,
  drag,
  between,
  velocity,
  setIndex,
}: IItemData) => {
  const [state, send] = useMachine(appMachine);

  const itemRef = useRef<HTMLDivElement>(null);
  const regex = /-?\d+(\.\d+)?/g;

  /**
   * Retrieves the initial position of the item from its inline style transform attribute.
   * @returns {number}  The initial position in percentage.
   */
  const getInitialPosition = (): number => {
    if (itemRef.current) {
      const currentPosition = itemRef.current.getAttribute("style") || "";
      const matches = currentPosition.match(regex);
      return matches ? parseFloat(matches[0]) : 0;
    }
    return 0;
  };

  /**
   * Updates the transform style of the item based on the given position and current state.
   * @param {number} position  The position to update the transform to.
   */
  const updateTransform = (position: number, currentPosition: number) => {
    // const currentPosition = state.context.moveX;
    if (itemRef.current) {
      const newPosition = position + currentPosition;
      if ($isInfinite) {
        if (newPosition < -(id + 1) * 100) {
          itemRef.current.style.transform = `translateX(${newPosition + $totalCount * 100}%)`;
        } else if (newPosition + id * 100 > ($totalCount - 1) * 100) {
          itemRef.current.style.transform = `translateX(${newPosition - $totalCount * 100}%)`;
        } else {
          itemRef.current.style.transform = `translateX(${newPosition}%)`;
        }
      } else {
        if (
          currentPosition + position > -700 &&
          currentPosition + position < 0
        ) {
          itemRef.current.style.transform = `translateX(${newPosition}%)`;
        }
      }
    }
  };

  /**
   * Sets the final transform position and updates the state.
   * @param {number} finalIndex  The final index to set.
   */

  const setFinalInfo = (finalIndex: number) => {
    if (itemRef.current) {
      send({
        type: "SET_MOVEX",
        xmove: finalIndex * 100,
      });
      itemRef.current.style.transform = `translateX(${finalIndex * 100}%)`;
    }
  };

  /**
   * Applies the initial transform based on the current index and direction when the component is mounted or updated.
   */
  useLayoutEffect(() => {
    if (itemRef.current && direction !== 0) {
      if ($isInfinite) {
        const prevIndex = ($index - direction + $totalCount) % $totalCount;
        if (prevIndex + id < $totalCount - 1) {
          itemRef.current.style.transform = `translateX(${prevIndex * 100}%)`;
        } else {
          itemRef.current.style.transform = `translateX(${-($totalCount - prevIndex) * 100}%)`;
        }
      } else {
        itemRef.current.style.transform = `translateX(${-(($totalCount - $index + direction) % $totalCount) * 100}%)`;
      }
    }
  }, [$index]);

  /**
   * Updates the position of the item over time based on the direction.
   */
  useEffect(() => {
    if (itemRef.current && direction !== 0) {
      let position = 0;
      let initialPosition = getInitialPosition();

      const updatePosition = () => {
        position += 5 * direction;
        if (itemRef.current) {
          itemRef.current.style.transform = `translateX(${initialPosition + position}%)`;
        }
        if (Math.abs(position) >= 100) {
          send({ type: "SET_MOVEX", xmove: getInitialPosition() });
          clearInterval(timer);
        }
      };

      const timer = setInterval(updatePosition, 10);
      return () => clearInterval(timer);
    }
  }, [$index]);

  /**
   * Updates the transform based on the drag state and between value.
   */
  useEffect(() => {
    if (drag && itemRef.current && between) {
      updateTransform((between / $itemWidth) * 100, state.context.moveX);
    }
  }, [between]);

  /**
   * Handles the end of the drag event and applies inertia to the item's movement.
   */
  useEffect(() => {
    if (!drag && itemRef.current) {
      send({ type: "SET_MOVEX", xmove: getInitialPosition() });
      const velocityLimit = Math.floor(velocity * 0.5) * 100;
      let speed = velocity * 0.7;
      const speedDecay = 1;
      let distanceTraveled = 0;

      if ($isInfinite) {
        const distance = between > 0 ? 1 : -1;
        if (between > 0) {
          const timer = setInterval(() => {
            let currentPosition;
            if (distanceTraveled === 0) {
              currentPosition = getInitialPosition();
            } else {
              currentPosition = state.context.moveX;
            }
            distanceTraveled += speed * distance;
            speed *= speedDecay;
            updateTransform(distanceTraveled, currentPosition);
            if (Math.abs(distanceTraveled) > velocityLimit) {
              clearInterval(timer);
              const position = getInitialPosition();
              const finalIndex = Math.floor(position / 100);
              setFinalInfo(finalIndex);
              if (position >= 0 && finalIndex !== $index) {
                setIndex(finalIndex);
              }
            }
          }, 11);
        } else if (between < 0) {
          const timer = setInterval(() => {
            let currentPosition;
            if (distanceTraveled === 0) {
              currentPosition = getInitialPosition();
            } else {
              currentPosition = state.context.moveX;
            }
            distanceTraveled += speed * distance;
            speed *= speedDecay;
            updateTransform(distanceTraveled, currentPosition);
            if (Math.abs(distanceTraveled) > velocityLimit) {
              clearInterval(timer);
              const position = getInitialPosition();
              const finalIndex = Math.floor(position / 100) + 1;
              setFinalInfo(finalIndex);
              if (position >= 0 && finalIndex !== $index) {
                setIndex(finalIndex);
              }
            }
          }, 11);
        }
      } else {
        const init = getInitialPosition();
        if (between > 0 && init < 0) {
          const timer = setInterval(() => {
            let currentPosition;
            if (distanceTraveled === 0) {
              currentPosition = getInitialPosition();
            } else {
              currentPosition = state.context.moveX;
            }
            distanceTraveled += speed;
            speed *= speedDecay;
            updateTransform(distanceTraveled, currentPosition);
            if (
              distanceTraveled > velocityLimit ||
              init + distanceTraveled > 70
            ) {
              clearInterval(timer);
              const position = getInitialPosition();
              let finalIndex;
              if (init + distanceTraveled > 0) {
                finalIndex = 0;
              } else {
                finalIndex = Math.floor(position / 100);
              }
              setFinalInfo(finalIndex);
              const index = (finalIndex + $totalCount) % $totalCount;
              if (position < 0 && index !== $index) {
                setIndex(index);
              }
            }
          }, 11);
        } else if (between < 0 && init > -700) {
          const timer = setInterval(() => {
            let currentPosition;
            if (distanceTraveled === 0) {
              currentPosition = getInitialPosition();
            } else {
              currentPosition = state.context.moveX;
            }
            distanceTraveled -= speed;
            speed *= speedDecay;
            updateTransform(distanceTraveled, currentPosition);
            if (
              Math.abs(distanceTraveled) > velocityLimit ||
              init + distanceTraveled < -770
            ) {
              clearInterval(timer);
              const position = getInitialPosition();
              let finalIndex;
              if (init + distanceTraveled < -700) {
                finalIndex = -7;
              } else {
                finalIndex = Math.floor(position / 100) + 1;
              }
              setFinalInfo(finalIndex);
              const index = (finalIndex + $totalCount - 1) % $totalCount;
              if (position < 0 && index !== $index) {
                setIndex(index);
              }
            }
          }, 11);
        }
      }
    }
  }, [drag]);

  return (
    <S.Container
      $itemWidth={$itemWidth}
      $isInfinite={$isInfinite}
      $index={$index}
      $viewCount={$viewCount}
      $totalCount={$totalCount}
      $backgroundColor={$backgroundColor}
      ref={itemRef}
    >
      <div className="title">Title {id + 1}</div>
    </S.Container>
  );
};
