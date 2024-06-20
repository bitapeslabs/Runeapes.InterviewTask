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
   * @param {number} position - The position to update the transform to.
   */
  const updateTransform = (position: number) => {
    const currentPosition = state.context.moveX;
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
      updateTransform((between / $itemWidth) * 100);
    }
  }, [between]);

  /**
   * Handles the end of the drag event and applies inertia to the item's movement.
   */
  useEffect(() => {
    if (!drag) {
      send({ type: "SET_MOVEX", xmove: getInitialPosition() });
      if (itemRef.current) {
        if ($isInfinite) {
          if (between > 0) {
            const velo = Math.floor(velocity) * 100;
            let count = 0;
            let speed = velocity * 30;
            const timer = setInterval(() => {
              count += speed;
              speed *= 0.95;
              updateTransform(count);
              if (count > velo) {
                clearInterval(timer);
                const position = getInitialPosition();
                const finalIndex = Math.floor(position / 100);
                if (itemRef.current) {
                  itemRef.current.style.transform = `translateX(${finalIndex * 100}%)`;
                  send({
                    type: "SET_MOVEX",
                    xmove: finalIndex * 100,
                  });
                }
                if (position >= 0 && finalIndex !== $index) {
                  setIndex(finalIndex);
                }
              }
            }, 20);
          } else if (between < 0) {
            const velo = Math.floor(velocity) * 100;
            let count = 0;
            let speed = velocity * 14;
            const timer = setInterval(() => {
              count -= speed;
              speed *= 0.95;
              updateTransform(count);
              if (Math.abs(count) > velo) {
                clearInterval(timer);
                const position = getInitialPosition();
                const finalIndex = Math.floor(position / 100);
                if (itemRef.current) {
                  send({
                    type: "SET_MOVEX",
                    xmove: finalIndex * 100,
                  });
                  itemRef.current.style.transform = `translateX(${finalIndex * 100}%)`;
                }
                if (position >= 0 && finalIndex !== $index) {
                  setIndex(finalIndex);
                }
              }
            }, 20);
          }
        } else {
          const init = getInitialPosition();
          if (between > 0 && init < 0) {
            const velo = Math.floor(velocity) * 100;
            let count = 0;
            let speed = velocity * 30;
            const timer = setInterval(() => {
              count += speed;
              speed *= 0.95;
              updateTransform(count);
              if (count > velo || init + count > 0) {
                clearInterval(timer);
                const position = getInitialPosition();
                const finalIndex = Math.round(position / 100);
                if (itemRef.current) {
                  itemRef.current.style.transform = `translateX(${finalIndex * 100}%)`;
                  send({
                    type: "SET_MOVEX",
                    xmove: finalIndex * 100,
                  });
                }
                const index = (finalIndex + $totalCount) % $totalCount;
                if (position < 0 && index !== $index) {
                  setIndex(index);
                }
              }
            }, 20);
          } else if (between < 0 && init > -700) {
            const velo = Math.floor(velocity) * 100;
            let count = 0;
            let speed = velocity * 14;
            const timer = setInterval(() => {
              count -= speed;
              speed *= 0.95;
              updateTransform(count);
              if (Math.abs(count) > velo || init + count < -700) {
                clearInterval(timer);
                const position = getInitialPosition();
                const finalIndex = Math.round(position / 100);
                if (itemRef.current) {
                  send({
                    type: "SET_MOVEX",
                    xmove: finalIndex * 100,
                  });
                  itemRef.current.style.transform = `translateX(${finalIndex * 100}%)`;
                }
                const index = (finalIndex + $totalCount - 1) % $totalCount;
                if (position < 0 && index !== $index) {
                  setIndex(index);
                }
              }
            }, 20);
          }
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
