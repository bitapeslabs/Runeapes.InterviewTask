import { useEffect, useState } from "react";
import * as S from "./item.styled";
import { IItemData } from "../../../utils/typesUtils";

export const Item = ({
  data,
  $itemWidth,
  $isInfinite,
  $viewCount,
  $totalCount,
  $index,
  id,
  $gap,
  movePosition,
}: IItemData) => {
  const [move, setMove] = useState<number>(0);
  const [positionMove, setPositionMove] = useState<number>(0);

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
  }, [$index]);

  useEffect(() => {
    if (movePosition) {
      setPositionMove(move + (movePosition / $itemWidth) * 100);
    }
  }, [movePosition]);

  return (
    <S.Container
      $itemWidth={$itemWidth}
      $isInfinite={$isInfinite}
      $index={$index}
      $viewCount={$viewCount}
      $totalCount={$totalCount}
      $translate={!movePosition ? move : positionMove}
      $gap={$gap}
    >
      <img src={data.image} alt="" />
    </S.Container>
  );
};
