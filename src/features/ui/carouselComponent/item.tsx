import { useEffect, useState } from "react";
import * as S from "./item.styled";
import { IItemData } from "../../../utils/typesUtils";

export const Item = ({
  $itemWidth,
  $isInfinite,
  $viewCount,
  $totalCount,
  $index,
  id,
  movePosition,
  $backgroundColor,
}: IItemData) => {
  const [move, setMove] = useState<number>(0);
  const [positionMove, setPositionMove] = useState<number>(0);
  const [zIndex, setZIndex] = useState<number>(0);

  useEffect(() => {
    if ($index + Math.floor($totalCount / 2) <= $totalCount) {
      if (id < $index + Math.floor($totalCount / 2)) {
        setMove(-$index * 100);
      } else {
        setMove(-($index + $totalCount) * 100);
      }
    } else {
      if (id < $totalCount && id >= $index - Math.floor($totalCount / 2)) {
        setMove(-$index * 100);
      } else {
        setMove(($totalCount - $index) * 100);
      }
    }

    if (
      id >= $index &&
      ((id < $index && id + $totalCount < $totalCount + $viewCount) ||
        id <= $index + $viewCount)
    ) {
      setZIndex(5);
    } else {
      setZIndex(0);
    }
  }, [$index]);

  useEffect(() => {
    if (movePosition) {
      setPositionMove(move + ((movePosition % $itemWidth) / $itemWidth) * 100);
    }
    // else {
    //   setMove(Math.round(positionMove / 100) * 100);
    // }
  }, [movePosition]);

  useEffect(() => {
    console.log('positionMove', positionMove)
  }, [positionMove])

  return (
    <S.Container
      $itemWidth={$itemWidth}
      $isInfinite={$isInfinite}
      $index={$index}
      $viewCount={$viewCount}
      $totalCount={$totalCount}
      $backgroundColor={$backgroundColor}
      $zIndex={zIndex}
      style={{ transform: `translateX(${!movePosition ? move : move + ((movePosition % $itemWidth) / $itemWidth) * 100}%)` }}
    >
      <div className="title">Title {id + 1}</div>
    </S.Container>
  );
};
